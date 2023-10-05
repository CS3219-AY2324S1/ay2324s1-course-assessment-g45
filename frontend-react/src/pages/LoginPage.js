import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { login } from '../apis/UserProfileApi'

const LoginPage = () => {
  const { user, dispatch } = useUserContext()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const {login, isLoading, error} = useLogin()
  const navigate = useNavigate()
  console.log(password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response  = await login(username, password)
    if (response.ok) {
      setUsername('')
      setPassword('')
    }

  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className='header'>
          <h3> Log in </h3>
        </div>
        {/* <div>
          debug:
          <div> {password} </div>
          <div> {username }</div>
        </div> */}
        <Form className='m-4'>
          {
            error &&
            <div className='error'> {error}</div>
          }

          <Form.Group>
            <Form.Label><b> User Name: </b> </Form.Label>
            <Form.Control
              type='text' 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label><b>Password: </b></Form.Label>
            <Form.Control
              type='password' 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Button 
            type='submit' 
            className='primary-btn' 
            onClick={(e) => handleSubmit(e)}
          >
            Log in
          </Button>
        </Form>
      </div>
    </div>  
  )
}

export default LoginPage