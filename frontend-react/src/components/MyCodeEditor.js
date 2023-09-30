import React, { useEffect, useState, useCallback } from 'react'
import ReactQuill from 'react-quill'
import io from 'socket.io-client'
import "quill/dist/quill.snow.css"
import Quill from "quill"


const MyCodeEditor = () => {
  const [ socket, setSocket ] = useState()
  const [quill, setQuill] = useState()

  // connect to socket
  useEffect(() => {
    const s = io.connect("http://localhost:3003")
    setSocket(s)
    return () => { // disconnect when done
      s.disconnect()
    }
  }, [])

  // create Quill, called when code-editor div is rendered
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {theme: "snow" })
    setQuill(q)
  }, [])

  // when text change, emit changes (delta) to socket
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send_changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      // clean up
      quill.off("text-change", handler) 
    }
  }, [socket, quill])

  // when receive changes, update quill
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on("received_changes", handler)

    return () => {
      // clean up
      socket.off("received_changes", handler)
    }
  }, [socket, quill])

  return (
    <div className='code-editor' ref={wrapperRef}></div>
  )
}

export default MyCodeEditor