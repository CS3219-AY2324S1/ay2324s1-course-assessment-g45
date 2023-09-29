import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import QuestionPopUp from './QuestionPopUp';
import QuestionForm from './QuestionForm';
import { useQuestionsContext } from '../../hooks/useQuestionContext';
import { getAllQuestions, deleteQuestion, patch, post } from '../../apis/QuestionApi';
import { useUserContext } from '../../hooks/useUserContext';

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
  const [editQn, setEditQn] = useState(null)

  const [selectedQn, setSelectedQn] = useState(null)
  const {user} = useUserContext();
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user) {
        setError('Please login to view questions')  
        return
      }
      const response = await getAllQuestions(user.token)
      const json = await response.json()
      console.log(response)

      if (response.ok) {
        dispatch({ type: 'SET_QUESTIONS', payload: json })
      }
    }

    fetchQuestions()
  }, [])

  const [error, setError] = useState(null)

  const handleDeleteQuestion = async (deleteQuestionId) => {
    if (!user) {
      setError('Please login to delete questions')  
      return
    }

    const response = await deleteQuestion(user.token, { id: deleteQuestionId })
    const json = await response.json()
    console.log(json);

    if (response.ok) {
      dispatch({ type: 'DELETE_QUESTION', payload: json })
    } else {
      setError(json.error)
      console.log(error)
    }
  }

  return (
    <div>
      { user.role == 'admin' && 
      <Button variant="success" className='ms-3 mt-3 pull-left'
        onClick={handleShowAddModal}>Add a question
      </Button>
      }
      {
        showAddModal &&
        <QuestionForm
        handleClose={() => setShowAddModal(false)}
        formTitle={'Add Question'}
        />
      }

      {
        editQn &&
        <QuestionForm
        editedQn={editQn}
        handleClose={() => setEditQn(null)}
        formTitle={'Edit Question'}
        />
      }

      {
        selectedQn &&
        <QuestionPopUp
          question={selectedQn}
          handleClose={() => setSelectedQn(null)}
        />
      }

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
          { user.role == 'admin' && 
          <Col xs="2">
          </Col>
          }
        </Row>
        {questions && questions.map((qn, j) => (
          <div>
            <Row className="justify-content-md-center">
              <Col xs="auto">
                {j + 1}
              </Col>
              <Col onClick={() => setSelectedQn(qn)}>
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
              { user.role == 'admin' && 
              <Col xs="2">
                <div>
                  <Button variant="danger" className='ms-2'
                    onClick={() => handleDeleteQuestion(qn._id)}>Delete</Button>
                  <Button variant="primary" className='ms-4'
                    onClick={() => setEditQn(qn)}>Update</Button>
                </div>
              </Col>
              }
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default QuestionTable