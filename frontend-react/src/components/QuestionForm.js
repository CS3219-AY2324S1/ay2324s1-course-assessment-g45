import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { deleteQuestion, patch, post } from '../apis/QuestionApi'

const QuestionForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [complexity, setComplexity] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const question = { title, description, categories, complexity }

    const response = await post(question)
    const json = await response.json()

    console.log(json)

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTitle('')
      setDescription('')
      setCategories('')
      setComplexity('')

      console.log('new user added', json)
    }
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className='m-4'>
            {
              error &&
              <div className='error'> {error} </div>
            }
            <Form.Group className='mb-3'>
              <Form.Label> <b> Title: </b> </Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label> <b> Description: </b> </Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label> <b> Categories: </b> </Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setCategories(e.target.value)}
                value={categories}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label> <b> Complexity: </b> </Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setComplexity(e.target.value)}
                value={complexity}
              />
            </Form.Group>
            {/* <Button type="submit" className='primary-btn' onClick={(e) => handleSubmit(e)}> Submit </Button> */}

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default QuestionForm