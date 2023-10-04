import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as formik from 'formik'
import * as yup from 'yup';

const Matching = () => {
  const [ showModal, setShowModal ] = useState(false)
  const { Formik } = formik
  const formRef = useRef()

  const [ isLoading, setIsLoading ] = useState(false)

  const schema = yup.object().shape({
    complexity: yup.string().required('Required')
  })

  const handleSubmit = () => {
    setIsLoading(true)
    console.log(formRef)
  }

  return (
    <div>
      <Button 
        className='ms-3 mt-3' 
        onClick={() => {setShowModal(true)}}
      > Find Match </Button>

      { 
        showModal &&
        <Modal show={true} onHide={() => setShowModal(false)}>
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
                  { isLoading && 
                  <div>
                    <Spinner animation='border'/>
                  </div> }
                  <Button type='submit' variant='primary'>
                    Find Match
                  </Button>
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