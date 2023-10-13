import React, { useEffect, useState } from 'react'
// import MyCodeEditor from '../components/MyCodeEditor'
import MonacoCodeEditor from '../components/MonacoCodeEditor'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import { getSession } from '../apis/CollabSessionApi'
import { getQuestionById } from '../apis/QuestionApi'

const CodingPage = () => {
  const { sessionId } = useParams()
  const [ question, setQuestion ] = useState(null)
  const [ isValidUser, setIsValidUser ] = useState(true)

  const { user } = useUserContext()

  useEffect(() => {
    const getQuestion = async (id) => {
      const response = await getQuestionById({ id })
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setQuestion(json)
        console.log(question)
      }
    }
    const fetchSession = async () => {
      // if (!user) return
      const session = await getSession({sessionId})
      const json = await session.json()
      console.log(json)
      // only allow specifically two users to access the coding page
      // if (user.id == session.uid1 || user.id == session.uid2) {
        // setIsValidUser(true)
      getQuestion(json.questionId)
      // }
    }
    fetchSession()
  }, [])

  // useEffect(() => {
  //   const getQuestion = async () => {
  //     const response = await getQuestionById({ id: questionId})
  //     const json = await response.json()
  //     console.log(json)
  //     if (response.ok) {
  //       setQuestion(json)
  //       console.log(question)
  //     }
  //   }
  //   const checkValidUser = () => {
  //     console.log(user)
  //     if (user && (user._id == uid1 || user._id == uid2 )) {
  //       setIsValidUser(true)
  //     }
  //   }
  //   checkValidUser()
  //   if (isValidUser) {
  //     getQuestion()
  //   }
  // }, []) // only called once

  return (
    <div>
      { 
        !isValidUser && 
        <div> Page not found </div>
      }

      {
        isValidUser &&
        <div className='row'>
          <div className='col-6'>
            {/* question description: { questionId } */}
            { question && question.description }
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