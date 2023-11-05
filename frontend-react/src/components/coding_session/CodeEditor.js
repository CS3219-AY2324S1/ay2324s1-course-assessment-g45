import React, { useRef, useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import "quill/dist/quill.snow.css"
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import loader from '@monaco-editor/loader';

const SAVE_INTERVAL_MS = 2000
const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [ socket, setSocket ] = useState()
  const { sessionId } = useParams()
  const [myEditor, setEditor] = useState()
  const editorRef = useRef(null);

  // initialized to true to block initial delta from socket on load
  // if value = true, do not send changes to socket!
  var isFlag = true;

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  function handleEditorDidMount(editor, monaco) {
    console.log("Editor mounted")
    editorRef.current = editor;
  }

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
  // const wrapperRef = useCallback(wrapper => {
  //   if (wrapper == null) return

  //   wrapper.innerHTML = ""
  //   const editor = document.createElement("div")
  //   wrapper.append(editor)

  //    loader.init().then((monaco) => {
  //     wrapper.style.height = '100vh';
  //     const properties = {
  //       language : language,
  //       value : value,
  //       theme : "vs-dark", //theme
  //       defaultValue : "// some comment"
  //     };
  //     const q = monaco.editor.create(wrapper, properties);
  //     setEditor(q)
  //   });
  // }, []);

  // check session id
  useEffect(() => {
    if (socket == null || myEditor == null) return
    console.log("load session call")
    // load once
    socket.once('load-session', doc => {
      //myEditor.setValue(doc)
    })
    socket.emit('get-session', sessionId)
    console.log(sessionId)
  }, [socket, myEditor, sessionId])

  // when text change, emit changes (delta) to socket
  useEffect(() => {
    if (socket == null || editorRef == null) return
    const handler = (delta) => {
      if (isFlag == true) {
        isFlag = false
        return
      }
      socket.emit("send_changes", delta)
      console.log("delta" + delta)
    }
    const editor = editorRef.current;
    if (editor)
    {
      editor.onDidChangeModelContent((a) => handler(a.changes[0]))
      console.log( "stuff print")
    }
    console.log( "stuff print ise efeeifct")
  }, [socket, editorRef])
  
  // when receive changes, update quill
  useEffect(() => {
    if (socket == null || myEditor == null) return          

    const handler = (delta) => {
      // set to true to prevent sending changes to socket again
      isFlag = true
      console.log(delta)
      myEditor.executeEdits("", [{ range : delta.range, text : delta.text }])
    }
    socket.on("received_changes", handler)

    return () => {
      // clean up
      socket.off("received_changes", handler)
    }
  }, [socket, myEditor])

  // save document on interval
  useEffect(() => {
    if (socket == null || myEditor == null) return

    const interval = setInterval(() => {
      //socket.emit('save-document', myEditor.getModel().getValue())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, myEditor])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={"vs-dark"}
        defaultValue="// some comment"
        //onChange={handleEditorChange}
        
        onMount={handleEditorDidMount}
      />
    </div> 
    //<div className='code-editor' ref={wrapperRef}></div>
  )
}

export default CodeEditor