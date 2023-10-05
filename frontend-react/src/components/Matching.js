import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as formik from 'formik'
import * as yup from 'yup';

const Matching = () => {
  const [ showModal, setShowModal ] = useState(false)
  const [ error, setError ] = useState('')
  const { Formik } = formik
  const formRef = useRef()
  const [ isFirstTry, setIsFirstTry ] = useState(true)

  const timerCountDown = 30000 // 30s
  const [ timeLeft, setTimeLeft ] = useState(null) // keep track of the remaining time
  const [ isLoading, setIsLoading ] = useState(false)

  const schema = yup.object().shape({
    complexity: yup.string().required('Required')
  })

  const handleFailedMatch = (timer, interval) => {
    setIsLoading(false)
    setError('Unable to find match, please try again later!')
    setIsFirstTry(false)
    clearTimeout(timer)
    clearInterval(interval)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setError('')

    // if sucess, redirect to collab page

    console.log(formRef)
    const startTime = (new Date()).getTime()
    console.log(startTime)
    const myInterval = setInterval(() => {
      setTimeLeft(getTimeLeft(startTime))
    }, 1000)
    const timeout = setTimeout(() => handleFailedMatch(timeout, myInterval), timerCountDown)
  }

  function getTimeLeft(startTime) {
    return Math.round((timerCountDown - (new Date().getTime() - startTime)) / 1000)
  }

  const handleClose = () => {
    setShowModal(false)
    setError('')
  }

  return (
    <div>
      <Button 
        className='ms-3 mt-3' 
        onClick={() => {setShowModal(true)}}
      > Find Match </Button>

      { 
        showModal &&
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton> 
            <Modal.Title> Find Match </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                complexity: ''
              }}
              innerRef={formRef}
            >
              {props => (
                <Form noValidate onSubmit={props.handleSubmit}>
                  <Form.Group className='mb-3'>
                    <Form.Label> Complexity</Form.Label>
                    <Form.Select
                      required
                      name='complexity'
                      onChange={props.handleChange}
                      value={props.values.complexity}
                      isInvalid={!!props.errors.complexity}
                    >
                      {!props.values.complexity && <option> Select Complexity </option>}
                      <option value='Easy'> Easy</option>
                      <option value='Medium'> Medium</option>
                      <option value='Hard'> Hard</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {props.errors.complexity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  { 
                    isLoading && 
                    <div >
                      <div className='d-flex justify-content-center mb-3'> Find match in progress... </div>
                      <div className='d-flex justify-content-center mb-3'> <Spinner animation='border'/></div>
                    </div> 
                  }
                  {
                    error &&
                    <div className='error mb-3'> {error} </div>
                  }

                  { 
                    timeLeft > 0 &&  
                    <div className='d-flex justify-content-center'> 
                      <h4> { timeLeft }s left </h4> 
                    </div> 
                  }

                  {
                    !isLoading && 
                    <div className='d-flex justify-content-center'>
                      <Button 
                        type='submit' 
                        variant='primary' 
                        disabled={isLoading}
                        className='align-self-center'
                        >
                        { isFirstTry ? 'Find Match' : 'Try again' }
                      </Button>
                    </div>
                  }
                </Form>
              )} 
            </Formik>
          </Modal.Body>
        </Modal>
      }
    </div>
  )
}

export default Matching