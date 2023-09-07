import React, { useState } from 'react'

const RegisterPopUp = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ error, setError ] = useState(null)
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(null)

  const checkConfirmPassword = (enteredPassword) => {
    if (!enteredPassword == password) {
      setConfirmPasswordError("Passwords must match")
    }
  }

  return (
    <div className='form-popup'>
      <div className='form-popup-card'>
        <div className='popup-header'>
          <h3> Register </h3>
          <button> x </button>
        </div>
        <form>
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

          <label> Confirm password: </label>
          <input
            type='password' onChange={(e) => checkConfirmPassword(e.target.value)}
            value = {password}
          />

          <label> Email: </label>
          <input
            type='text' onChange={(e) => setPassword(e.target.value)}
            value = {password}
          />
        </form>
      </div>

    </div>
  )
}

export default RegisterPopUp