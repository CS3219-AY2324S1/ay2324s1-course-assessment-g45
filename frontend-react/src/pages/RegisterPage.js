import React, { useState, useEffect } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import style from '../styles/style.css'
import { post } from '../apis/UserProfileApi'


const RegisterPage = () => {
  const { dispatch } = useUserContext()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const {signup, isLoading, error, setError} = useSignup()

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

    const response = await signup(username, password, email)

   if (response.ok) {
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setEmail('')
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

        <Form className='m-4'>
          {
            error && 
            <div className='error'> {error} </div>
          }
          <Form.Group className='mb-3'>
            <Form.Label> <b>Username: </b> </Form.Label>
            <Form.Control 
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> <b> Password: </b> </Form.Label>
            <Form.Control 
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
          </Form.Group>

          {
            confirmPasswordError &&
            <div className='error'> { confirmPasswordError }</div>
          }
          <Form.Group className='mb-3'>
            <Form.Label> <b> Confirm password: </b> </Form.Label>
            <Form.Control 
              type='password'
              onChange={(e) => checkConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> <b> Email: </b> </Form.Label>
            <Form.Control 
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value = {email}
            />
          </Form.Group>

          <Button type="submit" className='primary-btn' onClick={(e) => handleSubmit(e)}> Register </Button>

        </Form>
        {/* <form>
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
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default RegisterPage