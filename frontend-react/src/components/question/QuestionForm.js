import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useQuestionsContext } from '../../hooks/useQuestionContext';
import { getAllQuestions, deleteQuestion, patch, post } from '../../apis/QuestionApi';
import { useUserContext } from '../../hooks/useUserContext';

const QuestionForm = ({ editedQn, handleClose, formTitle }) => {
  const { questions, dispatch } = useQuestionsContext()
  const [title, setTitle] = useState(editedQn ? editedQn.title : '')
  const [description, setDescription] = useState(editedQn ? editedQn.description : '')
  const [categories, setCategories] = useState(editedQn ? editedQn.categories : '')
  const [complexity, setComplexity] = useState(editedQn ? editedQn.complexity : '')
  const [error, setError] = useState(null)
  const {user} = useUserContext();

  // if (question) {
  //   setTitle(question.title)
  //   setDescription(question.description)
  //   setCategories(question.categories)
  //   setComplexity(question.complexity)
  // }

  const handleSubmit = () => {
    handleClose()
    // check edit or add
    if (formTitle == 'Add Question') {
      handleAddQuestion()
    } else if (formTitle == 'Edit Question') {
      handleEditQuestion()
    }
  }

  const handleAddQuestion = async () => {
    const question = { title, description, categories, complexity }
    const response = await post(user.token, question)
    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      setError(json.error)
    } else {
      setTitle('')
      setDescription('')
      setCategories('')
      setComplexity('')
      setError(null)
      dispatch({ type: 'CREATE_QUESTION', payload: json })
      console.log('new question added', json)
    }
  }

  const handleEditQuestion = async () => {
    const question = { title, description, categories, complexity }
    const response = await patch(user.token, editedQn._id, question)
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    } else {
      setTitle('')
      setDescription('')
      setCategories('')
      setComplexity('')
      setError(null)
      dispatch({ type: 'EDIT_QUESTION', payload: json })
      console.log('question edited', json)
    }
  }

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCategories(e.target.value)}
                value={categories} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Complexity</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setComplexity(e.target.value)}
                value={complexity} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default QuestionForm
