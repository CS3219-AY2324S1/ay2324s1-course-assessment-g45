import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
//import { login } from '../apis/UserProfileApi'
import { useLogin } from '../hooks/useLogin'

const LoginPage = () => {
  const { user, dispatch } = useUserContext()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const {login, isLoading, error} = useLogin()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);


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
        <div className='card-header'>
        <img  src="https://img.logoipsum.com/224.svg">
            </img>  
          <h2> Log In </h2>
        </div>

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
            <div className="d-flex">
              <Form.Control
                  type={showPassword ? 'text' : 'password'} 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <i 
                  className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} 
                  onClick={() => setShowPassword(prev => !prev)}
                ></i>
            </div>
          </Form.Group>

          <Button 
            type='submit' 
            className='primary-btn' 
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
          >
            Log In
          </Button>
        </Form>
        <div className="text-center mt-4 mb-4 font-weight-light">
                    Don't have an account? <Link to="/register"  className="textlink-primary">Create</Link>
          </div>
      </div>
    </div>  
  )
}

export default LoginPage