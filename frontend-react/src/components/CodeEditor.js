import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3003") // connect to backend

const CodeEditor = () => {
  const [ userInput, setUserInput ] = useState('')
  const [ received, setReceived ] = useState('')

  const [ roomNumber, setRoomNumber ] = useState('')

  const sendMessage = () => {
    socket.emit("send_message", {
      message: userInput,
      roomNumber : roomNumber,
    })
    setUserInput('')
  }

  const joinRoom = () => {
    if (roomNumber !== '') {
      socket.emit("join_room", { roomNumber })
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceived(data.message)
    })
  }, [socket])

  return (
    <div>
      <div> debug: </div>
      <div> User input: {userInput}</div>
      <div> Server reply : {received} </div>
      <input 
        placeholder='Room number: '
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        />
      <button onClick={joinRoom}> join room </button>
      <input 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={sendMessage}> send </button>
    </div>
  )
}

export default CodeEditor