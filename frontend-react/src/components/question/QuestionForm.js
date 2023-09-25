import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';
import { useQuestionsContext } from '../../hooks/useQuestionContext';
import { patch, post } from '../../apis/QuestionApi';
import * as formik from 'formik';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const QuestionForm = ({ editedQn, handleClose, formTitle }) => {
  const { Formik } = formik
  const formRef = useRef()

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    categories: yup.string().required('Required'),
    complexity: yup.string().required('Required')
  });
  const { questions, dispatch } = useQuestionsContext()
  const [error, setError] = useState(null)

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
    const question = formRef.current.values
    const response = await post(question)
    const json = await response.json()
    console.log(json)
    if (!response.ok) {
      setError(json.error)
    } else {
      setError(null)
      dispatch({ type: 'CREATE_QUESTION', payload: json })
      console.log('new question added', json)
    }
  }

  const handleEditQuestion = async () => {
    const question = formRef.current.values
    const response = await patch(editedQn._id, question)
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    } else {
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
              title: editedQn ? editedQn.title : '',
              description: editedQn ? editedQn.description : '',
              categories: editedQn ? editedQn.categories.toString() : '',
              complexity: editedQn ? editedQn.complexity : '',
            }}
            validateOnChange={false}
            innerRef={formRef}
          >
            {({ handleSubmit, handleChange, errors, values }) =>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!errors.title}
                    autoFocus
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}</Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    isInvalid={!!errors.description}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}</Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control
                    type="text"
                    name="categories"
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
                    onChange={handleChange}
                    value={values.complexity}
                    isInvalid={!!errors.complexity}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.complexity}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label> Description </Form.Label>
                  <div style={{ height : 250, overflowY: 'auto'}}>
                    <ReactQuill
                      name="description"
                      theme='snow' 
                      value={values.description}
                      onChange={(e) => {
                        values.description = e; 
                        if (e == '<p><br></p>') errors.description = 'Required'
                      }}
                      isInvalid={!!errors.description}
                      style={{ height: 200 }}
                      />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.description} hello </Form.Control.Feedback>
                </Form.Group>


                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            }
          </Formik>


        </Modal.Body>
      </Modal>
    </>
  )
}
export default QuestionForm
