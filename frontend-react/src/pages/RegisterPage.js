import React, { useState, useEffect } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import style from '../styles/style.css'
import { post } from '../apis/UserProfileApi'
import { useSignup } from '../hooks/useSignup'
import logo from '../assets/images/logo.svg'
import orangeTreeImg from '../assets/images/orangeTree.png'; 
import orangeTreeImg2 from '../assets/images/orangeTree2.png'; 

const RegisterPage = () => {
  const { dispatch } = useUserContext()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  //const [ error, setError ] = useState(null)
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  const {signup, isLoading, error, setError} = useSignup()

  console.log(username)
  console.log(password)

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

    if (username == '' || password == '' || email == '' || confirmPasswordError) {
      setError('Please fill in all the fields')
      return
    }

    await signup(username, password, email)

    // const userInfo = { username, password, email }
    // if (username == '' || password == '' || email == '' || confirmPasswordError) {
    //   setError('Please fill in all the fields')
    //   return
    // }

    // const response = await post(userInfo)
    // const json = await response.json()

    // console.log(json)

    // if (!response.ok) {
    //   setError(json.error)
    // }

    // if (response.ok) {
    //   setUsername('')
    //   setPassword('')
    //   setConfirmPassword('')
    //   setEmail('')
    //   console.log('new user added', json)
    //   dispatch({ type : 'SET_USER', payload: json })
    //   navigate("/")
    // }

  }

  return (
    <div className='register-page'>
      <div className='register-card'>
      <div className='card-header'>
        <img  src={logo}>
            </img>  
          <h2> Register </h2>
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
              autoComplete="new-text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> <b> Email: </b> </Form.Label>
            <Form.Control 
              type='email'
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
              value = {email}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> <b> Password: </b> </Form.Label>
            <Form.Control 
              type='password'
              autoComplete="new-password"
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
              autoComplete="new-password"
              onChange={(e) => checkConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>
          <Button type="submit" className='primary-btn' onClick={(e) => handleSubmit(e)} disabled={isLoading}> Register </Button>
        </Form>
        <div className="text-center mt-4 mb-4 font-weight-light">
                    Already have an account? <Link to="/login"  className="textlink-primary">Log In</Link>
          </div>
      </div>
      <img src={orangeTreeImg} alt="Tree" className="tree-image-left" />
      <img src={orangeTreeImg2} alt="Tree3" className="tree-image-right" />
    </div>
  )
}

export default RegisterPage