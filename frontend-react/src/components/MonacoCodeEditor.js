import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactQuill from 'react-quill'
import io from 'socket.io-client'
import "quill/dist/quill.snow.css"
import Quill from "quill"
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import loader from '@monaco-editor/loader';
// import { v4 as uuidV4 } from 'uuid'

const SAVE_INTERVAL_MS = 2000
const MonacoCodeEditor = () => {
  const [ socket, setSocket ] = useState()
  const [quill, setQuill] = useState()
  const sessionId = "sessionString"
  //const { id : sessionId } = useParams()
  const [myEditor, setEditor] = useState()
  const [isFromSocket, setIsFromSocket] = useState()
  const editorRef = useRef(null)
  var isFlag = false;

  // connect to socket
  useEffect(() => {
    const s = io.connect("http://localhost:3003")
    setSocket(s)
    // console.log(uuidV4())
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
    // const q = //new Quill(editor, {theme: "snow" })
    // setQuill(q)

    // // initially disabled while loading the data 
    // q.disable()
    // q.setText('Loading..')

     loader.init().then((monaco) => {
    //   //const wrapper = document.getElementById('root');
      wrapper.style.height = '100vh';
      const properties = {
        value: '',
        language: 'javascript',
        theme: 'vs-dark'
      };
      const q = monaco.editor.create(wrapper, properties);
      setEditor(q)
      //editorRef.current = monaco.editor.create(wrapper, properties);
    });
  }, []);

  // check session id
  useEffect(() => {
    if (socket == null || myEditor == null) return
    console.log("load session call")
    // load once
    socket.once('load-session', doc => {
      myEditor.setValue(doc)
      console.log(doc)
      //quill.enable() // enable after document is loaded
    })
    socket.emit('get-session', sessionId)
    console.log(sessionId)
  }, [socket, myEditor, sessionId])

  // when text change, emit changes (delta) to socket
  useEffect(() => {
    if (socket == null || myEditor == null) return
    const handler = (delta, source) => {
      console.log("CHANGE EVENT CALL")
      // if (isFromSocket == true) {
      //   setIsFromSocket(false)
      //   return
      // }
      if (isFlag == true) {
        console.log("change event call, flag to false")
        isFlag = false
        return
      }
      socket.emit("send_changes", delta)
      console.log(delta)
    }

    myEditor.onDidChangeModelContent((a) => handler(a.changes[0]))
    // return () => {
    //   //clean up
    //   quill.off("text-change", handler) 
    // }
  }, [socket, myEditor])
  
  // when receive changes, update quill
  useEffect(() => {
    if (socket == null || myEditor == null) return          

    const handler = (delta) => {
      console.log("receive changes handler")
      //setIsFromSocket("hi im random shit")
      console.log(delta)

      isFlag = true
      console.log(isFlag)
      //myEditor.executeEdits("", [{ range : delta.range, text : delta.text }])
      myEditor.getModel().applyEdits(delta)
    }
    socket.on("received_changes", handler)

    return () => {
      // clean up
      socket.off("received_changes", handler)
    }
  }, [socket, myEditor])

  // save document on interval
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => { 
      socket.emit('save-document', quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  return (
    <div className='code-editor' ref={wrapperRef}></div>
  )
}

export default MonacoCodeEditor