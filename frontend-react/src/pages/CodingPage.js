import React, { useEffect, useState } from 'react'
import MonacoCodeEditor from '../components/MonacoCodeEditor'
import ReactQuill from 'react-quill'
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { getSession } from '../apis/CollabSessionApi'
import { getQuestionById } from '../apis/QuestionApi'
import ChatBox from '../components/coding_session/ChatBox'

const CodingPage = () => {
  const { sessionId } = useParams()
  const [ question, setQuestion ] = useState(null)
  const [ isValidUser, setIsValidUser ] = useState(true)

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
      const session = await getSession({sessionId})
      const json = await session.json()
      getQuestion(json.questionId)
    }
    fetchSession()
  }, [])

  return (
    <div>
      { 
        !isValidUser && 
        <div> This page is not available </div>
      }

      {
        isValidUser &&
        <div className='row'>
          <div className='col-6 vh-100 overflow-auto col'>
            <div className='row'>
              {
                question &&
                <ReactQuill 
                  value={question.description} 
                  readOnly={true} 
                  theme='bubble'/>
              }
            </div>
            <div className='row'>
              <ChatBox/>
            </div>
          </div>
          <div className='col-6'>
            <MonacoCodeEditor/>
          </div>
        </div>
      }
    </div>

  )
}

export default CodingPage