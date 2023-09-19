import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import QuestionForm from './QuestionForm';
import { useQuestionsContext } from '../hooks/useQuestionContext';
import { getAllQuestions, deleteQuestion, patch, post } from '../apis/QuestionApi'
// Question Id Question Title Question Description Question Category Question Complexity

const QuestionTable = () => {
  const { questions, dispatch } = useQuestionsContext()
  //const [questions, setQuestions] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getAllQuestions()
      const json = await response.json()
      console.log(response)

      if (response.ok) {
        dispatch({ type: 'SET_QUESTIONS', payload: json })
      }
    }

    fetchQuestions()
  }, [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [complexity, setComplexity] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    handleCloseAddModal()

    const question = { title, description, categories, complexity }

    console.log(question)
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
      setError(null)
      dispatch({type: 'CREATE_QUESTION', payload: json})
      console.log('new question added', json)
    }
  }

  const handleDeleteQuestion = async (deleteQuestionId) => {
    const response = await deleteQuestion({ id: deleteQuestionId })
    const json = await response.json()
    console.log(json);

    if (response.ok) {
      dispatch({type: 'DELETE_QUESTION', payload: json})
    } else {
      setError(json.error)
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="success" className='ms-3 mt-3 pull-left'
        onClick={handleShowAddModal}>Add a question
      </Button>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                value={title}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text" onChange={(e) => setCategories(e.target.value)}
                value={categories} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Complexity</Form.Label>
              <Form.Control
                type="text" onChange={(e) => setComplexity(e.target.value)}
                value={complexity} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className='p-3 m-0 border-0 bd-example m-0 border-0 bd-example-row'>
        <Row className="justify-content-md-center">
          <Col xs="auto">
            &nbsp;&nbsp;
          </Col>
          <Col>
            Title
          </Col>
          <Col>
            Categories
          </Col>
          <Col>
            Complexity
          </Col>
          <Col xs="2">
          </Col>
        </Row>
        {questions && questions.map((qn, j) => (
          <div>
            <Row className="justify-content-md-center">
              <Col xs="auto">
                {j + 1}
              </Col>
              <Col>
                {qn.title}
              </Col>
              <Col>
                {qn.categories.map((category, i) => (
                  qn.categories[i + 1] ? category + ", " : category
                ))}
              </Col>
              <Col>
                {qn.complexity}
              </Col>
              <Col xs="2">
                <div>
                  <Button variant="danger" className='ms-2'
                    onClick= {() => handleDeleteQuestion(qn._id)}>Delete</Button>
                  <Button variant="primary" className='ms-4'
                    onClick={handleShowAddModal}>Update</Button>

                  <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Question</Modal.Title>
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
                      <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleCloseEditModal}>
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default QuestionTable