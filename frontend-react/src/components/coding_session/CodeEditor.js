import React, { useRef, useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import "quill/dist/quill.snow.css"
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import loader from '@monaco-editor/loader';

import LanguagesDropdown from './LanguagesDropDown';
import { languageOptions } from '../../constants/languageOptions';
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import { compile, checkStatus } from '../../apis/CodeExecutionApi' 

const SAVE_INTERVAL_MS = 2000
const CodeEditor = ({isActive}) => {

  const [code, setCode] = useState("");
  //const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [value, setValue] = useState(code || "");
  const [socket, setSocket] = useState()
  const { sessionId } = useParams()
  const [myEditor, setEditor] = useState()
  const editorRef = useRef(null);


  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);

  // initialized to true to block initial delta from socket on load
  // if value = true, do not send changes to socket!
  var isFlag = true;

  function handleEditorDidMount(editor, monaco) {
    console.log("Editor mounted")
    editorRef.current = editor;
    setEditor(editor);
  }

  // for selection on language dropdown
  const onSelectChange = (langOption) => {
    handleLanguageChange(langOption)
    setLanguage(langOption);
    console.log("set language: " + langOption.value)
  };

  // const handleEditorChange = (value) => {
  //   setValue(value);
  //   onChange("code", value);
  // };

  // on language change, send change to socket
  const handleLanguageChange = (newLanguage) => {
    if (socket == null) return
    console.log("langauge change send to socket")
    socket.emit("send_language", newLanguage);
  };

  // on receive language change
  useEffect(() => {
    if (socket == null) return

    const handler = (delta) => {
      // set to true to prevent sending changes to socket again
      console.log("receive language changes " + delta.value)
      setLanguage(delta)
    }
    socket.on("received_language", handler)

    return () => {
      // clean up
      socket.off("received_language", handler)
    }
  }, [socket])

  const handleCompile = async () => {
    console.log("compiling code")
    setProcessing(true);
    setOutputDetails(null);
    const formData = {
      language_id: language.id,
      source_code: code,
      stdin: customInput,
      fields: '*'
    };
    const response = await compile(formData)
    console.log(response)
    const json = await response.json()
    console.log(response)
    console.log(json)

    if (!response.ok) {
      setProcessing(false)
      console.log('error', json)
      return
    }

    const token = json.token
    await handlecheckStatus(token)
  };

  const handlecheckStatus = async (token) => {
    console.log("checkstatus call")
    const response = await checkStatus(token)
    console.log(response)
    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      console.log('err', response)
      return
    }
    const statusId = json.status.id
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(async () => {
        await handlecheckStatus(token)
      }, 2000)
      return
    } else {
      setProcessing(false)
      setOutputDetails(json)
      console.log("Compile success")
      console.log('response.data', json)
      return
    }
  };


  // connect to socket
  useEffect(() => {
    const s = io.connect("http://localhost:3003")
    setSocket(s)
    // console.log(uuidV4())
    return () => { // disconnect when done
      s.disconnect()
    }
  }, [])

  // check session id
  useEffect(() => {
    if (socket == null || myEditor == null) return
    console.log("load session call")
    // load once
    socket.once('load-session', doc => {
      console.log(doc.data)
      setLanguage(doc.language)
      const model = myEditor.getModel()
      console.log(model)
      // model.setModelLanguage(doc.language)
      myEditor.setValue(doc.data)
      //setCode(doc.data)
    })
    socket.emit('get-session', sessionId)
    console.log(sessionId)
  }, [socket, myEditor, sessionId])

  // when text change, emit changes (delta) to socket
  useEffect(() => {
    if (socket == null || myEditor == null) return
    const handler = (delta) => {
      setCode(myEditor.getModel().getValue()) // setValue for code to be executed

      if (isFlag == true) {
        isFlag = false
        return
      }
      socket.emit("send_changes", delta)
      console.log("delta" + delta)
    }
    myEditor.onDidChangeModelContent((a) => handler(a.changes[0]))
  }, [socket, myEditor])

  // when receive changes, update quill
  useEffect(() => {
    if (socket == null || myEditor == null) return

    const handler = (delta) => {
      // set to true to prevent sending changes to socket again
      isFlag = true
      console.log("receive changes " + delta)
      myEditor.executeEdits("", [{ range: delta.range, text: delta.text }])
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
      const saveData = {
        data : myEditor.getModel().getValue(),
        language : language
      };

      socket.emit('save-document', saveData)
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, myEditor, language])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <div className='d-flex align-items-center'>
        <div className='py-2 flex-grow-1' >
          <LanguagesDropdown
            selectedLanguage={language}
            onSelectChange={onSelectChange} />
        </div>

        <div className='mx-3'>
          <button onClick={handleCompile}>
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
        </div>
      </div>

      {
        processing &&
        <i className='text-muted'> Processing... </i>
      }

      {
        outputDetails &&
        <div>
          <OutputWindow outputDetails={outputDetails}/>
          <OutputDetails outputDetails={outputDetails}/>
        </div>
      }

      <div> {language.label} </div>

      {
        language.template ? <p> {language.template}</p> : <div> nothing </div>
      }

      <Editor
        height="85vh"
        width={`100%`}
        language={language.value || "javascript"}
        value={value}
        theme={"vs-dark"}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        options={{ readOnly : !isActive}}
      />

    </div>
  )
}

export default CodeEditor