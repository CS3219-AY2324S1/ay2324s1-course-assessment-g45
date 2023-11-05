import React, { useEffect, useState } from 'react'
import MonacoCodeEditor from '../components/coding_session/MonacoCodeEditor'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { getSession } from '../apis/CollabSessionApi'
import { getQuestionById } from '../apis/QuestionApi'
import ChatBox from '../components/coding_session/ChatBox'
import Accordion from 'react-bootstrap/Accordion';
import AiAssistantSideBar from '../components/aiAssistant/aiAssistantSideBar';
import aiAssistantLogo from '../assets/images/aiAssistant.png';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ConfirmationPopup from '../components/ConfirmationPopup';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import Config from '../Config'
import Alert from 'react-bootstrap/Alert'

const baseUrl = Config.Common.CollabSessionApiBaseUrl;

const CodingPage = () => {
  const { sessionId } = useParams()
  const [ question, setQuestion ] = useState(null)
  const [ isValidUser, setIsValidUser ] = useState(true)
  const { user } = useUserContext()
  const [ session, setSession ] = useState()
  const [ leaveSessionPopup, setLeaveSessionPopup ] = useState(false)
  const navigate = useNavigate()
  const [ socket, setSocket ] = useState()
  const [ alert, setAlert ] = useState()

  const getQuestion = async (id) => {
    const response = await getQuestionById(user.token, { id })
    const json = await response.json()
    console.log(json)
    if (response.ok) {
      setQuestion(json)
      console.log(question)
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession({ sessionId })
      const json = await session.json()
      console.log(json)
      if (session.ok) {
        getQuestion(json.questionId)
        setSession(json)

        // invalid user
        if (user.id !== json.user1.uid && user.id !== json.user2.uid) {
          setIsValidUser(false)
          return;
        }
      }
    }
    fetchSession()
  }, [])

  // connect to socket
  useEffect(() => {
    const s = io.connect(baseUrl)
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])

  // join session
  useEffect(() => {
    if (user.id && sessionId && socket && session) {
      console.log(session)
      if ((user.id === session.user1.uid && session.user1.isActive) || (user.id === session.user2.uid && session.user2.isActive)) {
        socket.emit("join-session", sessionId)    
      }
    }
  }, [socket, sessionId, session])

  // receive notification
  useEffect(() => {
    if (!socket) return
    const handler = (data) => {
      // display alert
      console.log(data)
      setAlert(data)
      const timeout = setTimeout(() => setAlert(null), 5000)    
    }
    socket.on("notify", handler)
    return () => {
      socket.off("notify")
    }
  }, [socket])

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
      setSidebarOpen(!sidebarOpen);
  };

  const handleLeaveSession = () => {
    if (!socket || !session) return
    if (user.id === session.user1.uid) {
      const updatedUser = {...session.user1, isActive : false }
      socket.emit('leave-session', updatedUser)
      navigate('/')
    }
    if (user.id === session.user2.uid) {
      const updatedUser = {...session.user2, isActive : false }
      socket.emit('leave-session', updatedUser)
      navigate('/')
    }
    else {
      console.log('invalid user')
    }
  }

  // const handleLeaveSession = async () => {
  //   if (!session) return
  //   console.log(session)
  //   console.log(user.id)

  //   // set as inactive
  //   if (user.id === session.user1.uid) {
  //     const updatedUser = {...session.user1, isActive : false }
      
  //     const response = await updateSession(sessionId, { user1:updatedUser })
  //     const json = await response.json()
  //     console.log(json)
  //     if (response.ok) {
  //       navigate('/')
  //     }
  //   }

  //   if (user.id === session.user2.uid) {
  //     const updatedUser = {...session.user2, isActive : false }
  //     const response = await updateSession(sessionId, { user2: updatedUser })
  //     const json = await response.json()
  //     console.log(json)
  //     if (response.ok) {
  //       navigate('/')
  //     }
  //   }
  //   else {
  //     console.log('invalid user')
  //   }

  // }

  return (
    <div>
      {
        !isValidUser &&
        <div> This page is not available </div>
      }

      {
        isValidUser &&
        <div className='row'>
          <div className='col-6 vh-100 overflow-auto'>
            {
              question &&
              <ReactQuill
                value={`<h2>${question.title}</h2><br>${question.description}`}
                readOnly={true}
                theme='bubble' />
            }
          </div>
          <div className='col-6'>
            <MonacoCodeEditor />
          </div>

          {/* chat box */}
          <div className='fixed-bottom' style={{ width: '30vw'}}>
            <Accordion 
              style={{ width: '30vw' }}
            >
              <Accordion.Item>
                <Accordion.Header>
                  Live Chat
                </Accordion.Header>
                <Accordion.Body className='p-0' style={{height: '50vh'}}>
                  <ChatBox/>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </div>

          {
            alert &&
            <div className='d-flex justify-content-center'>
              <Alert variant='info'> { alert } </Alert>
            </div>
          }
          
          {/* side bar buttons */}
          <div className='floating-btns d-flex justify-content-center'>
            <OverlayTrigger 
              placement='top' 
              overlay={<Tooltip> Leave Session </Tooltip>}
            >
              <button className='leave-session-btn' onClick={() => setLeaveSessionPopup(true)}> 
                <span class="material-symbols-outlined">logout</span>              
              </button>
            </OverlayTrigger>

            <OverlayTrigger
              placement='top'
              overlay={<Tooltip> AI Assistant </Tooltip>}
            >
              <button className='ai-button' onClick={handleSidebarToggle}>
                <img src={aiAssistantLogo} alt="Customer Service" className='ai-image'/>
              </button>
            </OverlayTrigger>
          </div>
          {sidebarOpen && <AiAssistantSideBar onClose={handleSidebarToggle} />}

          {
            leaveSessionPopup &&
            <ConfirmationPopup
              title='Leave Session'
              message={'Confirm leave session?'}
              handleClose={() => setLeaveSessionPopup(false)}
              handleSubmit={handleLeaveSession}
            />
          }
        </div>
      }

    </div>

  )
}

export default CodingPage