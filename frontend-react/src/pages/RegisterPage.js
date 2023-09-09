import React, { useState, useEffect } from 'react'
import style from '../styles/style.css'
import MyAlert from '../components/MyAlert'
import { useUserContext } from '../hooks/useUserContext'
import { redirect } from 'react-router-dom'

const RegisterPage = () => {
  const { dispatch } = useUserContext()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ error, setError ] = useState(null)
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(null)

  const checkConfirmPassword = (pw) => {
    setConfirmPassword(pw)
    if (!(pw === password)) {
      setConfirmPasswordError("Passwords must match")
    } else {
      setConfirmPasswordError(null)
    }
  }

  const checkPassword = (pw) => {
    setPassword(pw)
    if (confirmPassword.length > 0 && !(pw === confirmPassword)) {
      setConfirmPasswordError("Passwords must match")
    } else {
      setConfirmPasswordError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { username, password, email }

    const response = await fetch('/api/userProfiles/', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-type' : 'application/json'
      }
    })
    const json = await response.json()

    console.log(json)

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setEmail('')
      console.log('new user added', json)
      dispatch({ type : 'SET_USER', payload: json })
      redirect(`/`)
    }

  }

  return (
    <div className='register-page'>
      <div className='register-card'>
        <div className='header'>
          <h3> Register </h3>
          {/* <button className='close-btn'>
          <span class="material-symbols-outlined">close</span>
          </button> */}
        </div>

        <div>
          debug:
          <div> {password} </div>
          <div> {confirmPassword }</div>
        </div>
        <form>
          <label> User Name: </label>
          <input
            type='text' onChange={(e) => setUsername(e.target.value)}
            value = {username}
          />

          <label> Password: </label>
          <input
            type='password' onChange={(e) => checkPassword(e.target.value)}
            value = {password}
          />

          {
            confirmPasswordError &&
            <div className='error'> { confirmPasswordError }</div>
          }
          <label> Confirm password: </label>
          <input
            type='password' onChange={(e) => checkConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <label> Email: </label>
          <input
            type='text' onChange={(e) => setEmail(e.target.value)}
            value = {email}
          />

          <div className='btn-container'>
            <button type='submit' className='primary-btn' onClick={(e) => handleSubmit(e)}> Register </button>
          </div>
          {/* <MyAlert serverity={0} message={'Registered successfully'}/> */}


        </form>

      </div>

    </div>
  )
}

export default RegisterPage