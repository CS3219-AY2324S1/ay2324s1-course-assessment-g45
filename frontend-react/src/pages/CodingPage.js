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

const CodingPage = () => {
  const { sessionId } = useParams()
  const [ question, setQuestion ] = useState(null)
  const [ isValidUser, setIsValidUser ] = useState(true)
  const [ showChat, setShowChat ] = useState(false)
  const { user } = useUserContext()


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

          <div className='fixed-bottom w-30'>
            {/* <Button 
              onClick={() => setShowChat(true)}
            > Show Chat </Button> */}
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
            showChat && 
            <ChatBox 
              setShowChat={setShowChat}
            />
          }
        </div>
      }

      <div className={`sideBarButton ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <button className="floating-button" onClick={handleSidebarToggle}>
          <img src={aiAssistantLogo} alt="Customer Service" />
        </button>
      </div>
      {sidebarOpen && <AiAssistantSideBar onClose={handleSidebarToggle} />}
    </div>

  )
}

export default CodingPage