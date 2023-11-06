import React, { useRef, useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import "quill/dist/quill.snow.css"
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import loader from '@monaco-editor/loader';

import axios from 'axios';
import LanguagesDropdown from './LanguagesDropDown';
import { languageOptions } from '../../constants/languageOptions';
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";

const SAVE_INTERVAL_MS = 2000
const CodeEditor = () => {

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

  const handleCompile = () => {
    console.log("button click")
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log("error : " + error);
      });
  };

  const checkStatus = async (token) => {
    console.log("checkstatus call")
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        //showSuccessToast(`Compiled Successfully!`)
        console.log("Compile success")
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      //showErrorToast();
    }
  };

  // const showSuccessToast = (msg) => {
  //   toast.success(msg || `Compiled Successfully!`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };
  // const showErrorToast = (msg) => {
  //   toast.error(msg || `Something went wrong! Please try again.`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,  
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };


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
      myEditor.setValue(doc.data)
      //setCode(doc.data)
      setLanguage(doc.language)
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
      <div className="px-4 py-2">
        <LanguagesDropdown
          selectedLanguage={language}
          onSelectChange={onSelectChange} />
      </div>

      <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
        <OutputWindow outputDetails={outputDetails} />
        <div className="flex flex-col items-end">
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
          <button
            onClick={handleCompile}
          //disabled={!code}
          // className={classnames(
          //   "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
          //   !code ? "opacity-50" : ""
          // )}
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </button>
        </div>
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
      </div>

      <Editor
        height="85vh"
        width={`100%`}
        language={language.value || "javascript"}
        value={value}
        theme={"vs-dark"}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />

    </div>
    //<div className='code-editor' ref={wrapperRef}></div>
  )
}

export default CodeEditor