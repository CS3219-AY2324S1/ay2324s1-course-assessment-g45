import React, { useState, useEffect } from 'react'
import style from '../styles/style.css'
import MyAlert from './MyAlert'

const RegisterPopUp = () => {
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

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setEmail('')
    }

  }

  return (
    <div className='form-popup'>
      <div className='form-popup-card'>
        <div className='popup-header'>
          <h3> Register </h3>
          <button className='close-btn'>
          <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form className='register-form'>
          <label> User Name: </label>
          <input
            type='text' onChange={(e) => setUsername(e.target.value)}
            value = {username}
          />

          <label> Password: </label>
          <input
            type='password' onChange={(e) => setPassword(e.target.value)}
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

export default RegisterPopUp