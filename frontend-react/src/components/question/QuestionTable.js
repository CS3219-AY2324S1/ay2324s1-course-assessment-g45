import React, { useEffect, useState, Component } from 'react';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const [editQn, setEditQn] = useState(null)

  const [selectedQn, setSelectedQn] = useState(null)
  const { user } = useUserContext();
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

  const getBadgeClass = (complexity) => {
    switch (complexity) {
      case 'Hard': return 'badge bg-danger';
      case 'Medium': return 'badge bg-warning';
      case 'Easy': return 'badge bg-success';
      default: return 'badge bg-info';
    }
  }


  return (
    <div>
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


      <div className="col-lg-8 offset-lg-2 grid-margin stretch-card mt-5">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
              <h4 className="card-title">Questions</h4>
              {user.role == 'admin' &&
                <button type="button" className="btn btn-primary" onClick={handleShowAddModal}>
                  Add a question <i className="fa-solid fa-plus"></i>
                </button>
              }
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Complexity</th>
                    {user.role == 'admin' &&
                      <th></th>
                    }
                  </tr>
                </thead>
                <tbody>

                  {questions && questions.map((qn, j) => (
                    <tr key={j} onClick={() => setSelectedQn(qn)}>
                      <td>{j + 1}</td>
                      <td>{qn.title}</td>
                      <td>
                        {qn.categories.map((category, i) => (
                          qn.categories[i + 1] ? category + ", " : category
                        ))}
                      </td>
                      <td>
                        <label className={getBadgeClass(qn.complexity)}>
                          {qn.complexity}
                        </label>
                      </td>
                      {user.role == 'admin' &&
                        <td>
                          <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-secondary me-2" onClick={(e) => { e.stopPropagation(); setEditQn(qn) }}>
                              Edit <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteQuestion(qn._id) }}>
                              Delete <i className="fa-regular fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionTable