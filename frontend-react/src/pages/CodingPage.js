import React, { useEffect, useState } from 'react'
import MonacoCodeEditor from '../components/coding_session/MonacoCodeEditor'
import ReactQuill from 'react-quill'
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { getSession } from '../apis/CollabSessionApi'
import { getQuestionById } from '../apis/QuestionApi'
import ChatBox from '../components/coding_session/ChatBox'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import AiAssistantSideBar from '../components/aiAssistant/aiAssistantSideBar';
import aiAssistantLogo from '../assets/images/aiAssistant.png';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ConfirmationPopup from '../components/ConfirmationPopup';

const CodingPage = () => {
  const { sessionId } = useParams()
  const [ question, setQuestion ] = useState(null)
  const [ isValidUser, setIsValidUser ] = useState(true)
  const { user } = useUserContext()
  const [ leaveSessionPopup, setLeaveSessionPopup ] = useState(false)


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
      getQuestion(json.questionId)
    }
    fetchSession()
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
      setSidebarOpen(!sidebarOpen);
  };

  const handleLeaveSession = () => {
    // save session info

  }

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