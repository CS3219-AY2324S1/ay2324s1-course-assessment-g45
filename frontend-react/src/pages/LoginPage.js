import React from 'react'
import { useState } from 'react'

const LoginPage = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('') 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/userProfiles', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
    const json = await response.json()
    console.log(json)
  }

  return (
    <div className='register-page'>
      <div className='register-card'>
        <div className='header'>
          <h3> Log in </h3>
        </div>
        <div>
          debug:
          <div> {password} </div>
          <div> {username }</div>
        </div>
        <form className='register-form'>
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