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
import ConfirmationPopup from '../ConfirmationPopup';
import { useUserContext } from '../../hooks/useUserContext';

// Question Id Question Title Question Description Question Category Question Complexity

const QuestionTable = () => {
  const { questions, dispatch } = useQuestionsContext()
  const [showAddModal, setShowAddModal] = useState(false);
  // const handleCloseAddModal = () => setShowAddModal(false);
  // const handleShowAddModal = () => setShowAddModal(true);

  // const [showEditModal, setShowEditModal] = useState(false);
  // const handleCloseEditModal = () => setShowEditModal(false);
  // const handleShowEditModal = () => setShowEditModal(true);
  const [editQn, setEditQn] = useState(null)
  const [ deleteQn, setDeleteQn ] = useState(null)

  const [selectedQn, setSelectedQn] = useState(null)

  const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)
 
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

  const [error, setError] = useState(null)

  const handleDeleteQuestion = async (deleteQuestionId) => {
    const response = await deleteQuestion({ id: deleteQuestionId })
    const json = await response.json()
    console.log(json);

    if (response.ok) {
      dispatch({ type: 'DELETE_QUESTION', payload: json })
      setDeleteQn(null)
    } else {
      setError(json.error)
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="success" className='ms-3 mt-3 pull-left'
        onClick={() => setShowAddModal(true)}>Add a question
      </Button>
      {
        showAddModal &&
        <QuestionForm
        handleClose={() => setShowAddModal(false)}
        formTitle={'Add Question'}
        />
      }

      {/* show edit popup */}
      {
        editQn &&
        <QuestionForm
        editedQn={editQn}
        handleClose={() => setEditQn(null)}
        formTitle={'Edit Question'}
        />
      }

      {/* show delete confirmation popup  */}
      {
        deleteQn &&
        <ConfirmationPopup
          title={'Delete Question'}
          message={'Are you sure to proceed? This action cannot be undone.'}
          handleClose={() => setDeleteQn(null)}
          handleSubmit={() => handleDeleteQuestion(deleteQn._id)}
        />
      }

      {/* description popup */}
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
          <Col xs="2">
          </Col>
        </Row>
        {questions && questions.map((qn, j) => (
          <div key={j}>
            <Row className="justify-content-md-center">
              <Col xs="auto">
                {j + 1}
              </Col>
              <Col onClick={() => setSelectedQn(qn)}>
                <span role='button'>{qn.title}</span>
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
                    onClick={() => setDeleteQn(qn)}>Delete</Button>
                  <Button variant="primary" className='ms-4'
                    onClick={() => setEditQn(qn)}>Update</Button>
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