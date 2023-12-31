import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import logo from '../assets/images/logo.svg'
import orangeTreeImg from '../assets/images/orangeTree.png'; 
import orangeTreeImg2 from '../assets/images/orangeTree2.png'; 

const LoginPage = () => {
  const { user, dispatch } = useUserContext()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  //const [ error, setError ] = useState(null)
  const {login, isLoading, error} = useLogin()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password)
    // const response = await fetch('/api/userProfiles/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   },
    //   body: JSON.stringify({ username, password})
    // })

    // const response = await login({ username, password })
    // const json = await response.json()

    // if (!response.ok) {
    //   setError(json.error)
    // }

    // if (response.ok) {
    //   setUsername('')
    //   setPassword('')
    //   console.log('Logged in successfully!', json)
    //   dispatch({ type: 'SET_USER', payload: json })
    //   console.log(user)
    //   navigate("/")
    // }

  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className='card-header'>
        <img  src={logo}>
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

      <img src={orangeTreeImg} alt="Tree" className="tree-image-left" />
      <img src={orangeTreeImg2} alt="Tree3" className="tree-image-right" />
    </div>  
    
  )
}

export default LoginPage