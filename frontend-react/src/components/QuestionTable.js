import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import QuestionForm from './QuestionForm';
import { getAllQuestions, deleteQuestion, patch, post } from '../apis/QuestionApi'
// Question Id Question Title Question Description Question Category Question Complexity

const QuestionTable = () => {
  const [questions, setQuestions] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getAllQuestions()
      const json = await response.json()
      console.log(response)

      if (response.ok) {
        setQuestions(json)
      }
    }

    fetchQuestions()
  }, [])

  return (
    <div>
        <Button variant="success" className='ms-3 mt-3 pull-left'
          onClick={handleShow}>Add a question
        </Button>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
                  <Button variant="danger" className='ms-2'>Delete</Button>
                  <Button variant="primary" className='ms-4'>Update</Button>
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