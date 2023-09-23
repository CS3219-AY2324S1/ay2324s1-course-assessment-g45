import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useQuestionsContext } from '../../hooks/useQuestionContext';
import { getAllQuestions, deleteQuestion, patch, post } from '../../apis/QuestionApi';
import * as formik from 'formik';
import * as yup from 'yup';

const QuestionForm = ({ editedQn, handleClose, formTitle }) => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    categories: yup.string().required('Required'),
    complexity: yup.string().required('Required')
  });
  const { questions, dispatch } = useQuestionsContext()
  const [title, setTitle] = useState(editedQn ? editedQn.title : '')
  const [description, setDescription] = useState(editedQn ? editedQn.description : '')
  const [categories, setCategories] = useState(editedQn ? editedQn.categories : '')
  const [complexity, setComplexity] = useState(editedQn ? editedQn.complexity : '')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // if (question) {
  //   setTitle(question.title)
  //   setDescription(question.description)
  //   setCategories(question.categories)
  //   setComplexity(question.complexity)
  // }

  const handleSubmitFunct = () => {
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
    const response = await post(question)
    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    } else {
      setTitle('')
      setDescription('')
      setCategories('')
      setComplexity('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_QUESTION', payload: json })
      console.log('new question added', json)
    }
  }

  const handleEditQuestion = async () => {
    const question = { title, description, categories, complexity }
    const response = await patch(editedQn._id, question)
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
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmitFunct}
            initialValues={{
              title: '',
              description: '',
              categories: '',
              complexity: '',
            }}
            validateOnChange={false}
          >
            {({ handleSubmit, handleChange, errors, values, touched }) =>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    // onChange={(e) => setTitle(e.target.value)}
                    // value={title}
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!errors.title}
                    autoFocus 
                    className="mb-0"/>
                  <Form.Control.Feedback type="invalid">
                    {errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    // onChange={(e) => setDescription(e.target.value)}
                    // value={description}
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    isInvalid={!!errors.description}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control
                    type="text"
                    name="categories"
                    // onChange={(e) => setCategories(e.target.value)}
                    // value={categories}
                    onChange={handleChange}
                    value={values.categories}
                    isInvalid={!!errors.categories}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.categories}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Complexity</Form.Label>
                  <Form.Control
                    type="text"
                    name="complexity"
                    // onChange={(e) => setComplexity(e.target.value)}
                    // value={complexity}
                    onChange={handleChange}
                    value={values.complexity}
                    isInvalid={!!errors.complexity}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.complexity}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            }
          </Formik>
        </Modal.Body>
        {/* 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitFunct}>
            Submit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}
export default QuestionForm
