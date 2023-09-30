import { useState, useRef } from "react"
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"



// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

const CollabEditor = () => {
  const editorRef = useRef(null)

  // Editor value -> YJS Text value (shared by multiple people)
  // Edits made to this text is shown to all users
  // Handled by YJS

  // Initialize YJS, tell it to listen to our Monaco instance for changes.
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc() // a collection of shared objects -> Text
    
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider("test-room", doc) // room1, room2
    const type = doc.getText("monaco") // doc { "monaco": "What our IDE is showing" }
    
    // Bind YJS to Monaco
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
    console.log(provider.awareness)
  }  
  
  return (
      <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
      />
    )
  }

export default CollabEditor