import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { user, dispatch } = useUserContext()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/userProfiles/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setUsername('')
      setPassword('')
      console.log('Logged in successfully!', json)
      dispatch({ type: 'SET_USER', payload: json })
      console.log(user)
      navigate("/")
    }

  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className='header'>
          <h3> Log in </h3>
        </div>
        <div>
          debug:
          <div> {password} </div>
          <div> {username }</div>
        </div>
        <form>
          <label> User Name: </label>
          <input
            type='text' onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label> Password: </label>
          <input
            type='password' onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className='btn-container'>
            <button type='submit' className='primary-btn' onClick={(e) => handleSubmit(e)}> Log in </button>
          </div>
        </form>
      </div>
    </div>  
  )
}

export default LoginPage