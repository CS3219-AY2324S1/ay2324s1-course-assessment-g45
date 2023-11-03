import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../hooks/useUserContext'
import { io } from 'socket.io-client'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../../styles/style.css'
import { v4 as uuidV4 } from 'uuid'


const ChatBox = () => {
  const { user } = useUserContext()
  const { sessionId } = useParams()
  const [ socket, setSocket ] = useState()

  const [ currentMsg, setCurrentMsg ] = useState("")
  const [ messageList, setMessageList ] = useState([])

  const bottomRef = useRef(null)

  // connect to socket
  useEffect(() => {
    const s = io.connect("http://localhost:3003")
    setSocket(s)
    console.log(bottomRef.current)
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    return () => { // disconnect when done
      s.disconnect()
    }
  }, [])

  // join chat session
  useEffect(() => {
    if (user.id && sessionId && socket) {
      socket.emit("join-chat", sessionId)
      socket.once('load-chat', chat => {
        console.log(chat)
        setMessageList(chat)
      })
      bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [socket, sessionId])
  
  const sendMsg = async () => {
    if (currentMsg === "") return
    let currentTime = new Date(Date.now()).toTimeString().slice(0,5)
    console.log(currentTime)
    const msgData = { 
      sessionId,
      uid: user.id,
      username: user.username,
      message: currentMsg,
      time: currentTime,
    }
    console.log(msgData)
    await socket.emit("send-chat", msgData)
    setMessageList((list) => [...list, msgData])
    setCurrentMsg("")
  }

  useEffect(() => {
    if (!socket) return
    socket.on("receive-chat", (data) => {
      console.log("received changes", data)
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  // scroll to bottom everytime new message is sent
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messageList])

  // before user leave page, save data
  // useEffect(() => {
  //   const onBeforeUnload = async (e) => {
  //     if (!socket) return 
  //     e.preventDefault();
  //     socket.emit('save-chat', { chat : messageList})
  //     console.log('save chat')
  //   }
  //   window.addEventListener("beforeunload", onBeforeUnload)
  //   return () => {
  //     window.removeEventListener("beforeunload", onBeforeUnload)
  //   }
  // }, [])

  return (
    <div className='d-flex flex-column h-100'>
      <div className='chat-body flex-grow-1 overflow-y-scroll'>
          { messageList.map((msg) => {
            return (
              <div
                className='message flex px-2'
                id={ msg.uid === user.id ? "current-user" : "other-user" }
                key={uuidV4()}
              >
                <div className='m-0'>
                  <div className= 'message-content d-inline-block m-2 p-2 rounded text-white'>
                    <b> {msg.username } </b>
                    <div> { msg.message } </div>
                  </div>
                  <div className='d-flex message-meta'>
                    <div> { msg.time } </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef}/>
      </div>
      <div className='chat-footer'>
        <InputGroup className='mx-2'>
          <Form.Control
            placeholder='Send a message..'
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMsg()
            }}
          />
          <Button variant='outlined'>
            <span className="material-symbols-outlined">send</span>
          </Button>
        </InputGroup>
      </div>
    </div>
  )
}

export default ChatBox