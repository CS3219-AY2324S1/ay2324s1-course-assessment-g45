import React from 'react'
import io from 'socket.io-client'
import Config from '../../Config'

const baseUrl = Config.Common.ChatApiBaseUrl
const socket = io.connect(baseUrl)

socket.on('connect', () => {
  console.log('connected to socket.io')
})
const ChatBox = () => {
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox