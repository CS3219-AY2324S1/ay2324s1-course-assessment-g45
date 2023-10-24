import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../hooks/useUserContext'
import { io } from 'socket.io-client'

const ChatBox = () => {
  const { user } = useUserContext()
  const { sessionId } = useParams()
  const [ socket, setSocket ] = useState()

  const [ currentMsg, setCurrentMsg ] = useState("")
  const [ messageList, setMessageList ] = useState([])

  // connect to socket
  useEffect(() => {
    const s = io.connect("http://localhost:3003")
    setSocket(s)
    return () => { // disconnect when done
      s.disconnect()
    }
  }, [])

  // join chat session
  useEffect(() => {
    if (user.id && sessionId && socket) {
      socket.emit("join-chat", sessionId)
    }
  }, [socket, sessionId])
  
  const sendMsg = async () => {
    if (currentMsg === "") return
    let currentTime = new Date(Date.now())
    currentTime = currentTime.getHours() + ":" + currentTime.getMinutes()
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

  return (
    <div>
      <div className='chat-header'>
        <p> Live Chat </p>
      </div>
      <div className='chat-body'>
        <div>
          { messageList.map((msg) => {
            return (
              <div
                className={'message ' + msg.uid === user.id ? "current-user" : "other-user"}
                key={msg.time}
              >
              <div>
                <p> { msg.message } </p>
              </div>
              <div>
                <p> { msg.time } </p>
                <p> { msg.username } </p>
              </div>

              </div>
            )
          })}
        </div>

      </div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='hey...'
          value={currentMsg}
          onChange={(e) => {
            setCurrentMsg(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMsg()
            }
          }}          
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatBox