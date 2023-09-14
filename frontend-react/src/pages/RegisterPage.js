import React, { useState, useEffect } from 'react'
import style from '../styles/style.css'
import MyAlert from '../components/MyAlert'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const { dispatch } = useUserContext()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ error, setError ] = useState(null)
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(null)
  const navigate = useNavigate()

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
    if (username == '' || password == '' || email == '' || confirmPasswordError) {
      setError('Please fill in all the fields')
      return
    }

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
      navigate("/")
    }

  }

  return (
    <div className='register-page'>
      <div className='register-card'>
        <div className='header'>
          <h3> Register </h3>
        </div>

        {/* <div>
          debug:
          <div> {password} </div>
          <div> {confirmPassword }</div>
        </div> */}


        <form>
          {
            error && 
            <div className='error'> {error} </div>
          }
          {/* { 
            isAlert &&
            <MyAlert serverity={0} message={'Registered successfully'}/>
          } */}

          <label> User Name: </label>
          <input
            type='text' 
            onChange={(e) => setUsername(e.target.value)}
            value = {username} 
            required={true}
          />

          <label> Password: </label>
          <input
            type='password' 
            onChange={(e) => checkPassword(e.target.value)}
            value = {password}
            required
          />

          {
            confirmPasswordError &&
            <div className='error'> { confirmPasswordError }</div>
          }
          <label> Confirm password: </label>
          <input
            type='password' 
            onChange={(e) => checkConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />

          <label> Email: </label>
          <input
            type='text' 
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            required
          />

          <div className='btn-container'>
            <input type='submit' className='primary-btn' onClick={(e) => handleSubmit(e)}/>
            {/* <button type='submit' className='primary-btn' onClick={(e) => handleSubmit(e)}> Register </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage