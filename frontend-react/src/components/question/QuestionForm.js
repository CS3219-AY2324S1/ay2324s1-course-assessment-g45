import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useRef, useEffect } from 'react';
import { useQuestionsContext } from '../../hooks/useQuestionContext';
import { getAllQuestions, deleteQuestion, patch, post} from '../../apis/QuestionApi';
import { useUserContext } from '../../hooks/useUserContext';
import * as formik from 'formik';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const QuestionForm = ({ editedQn, handleClose, formTitle }) => {
  const { Formik } = formik
  const formRef = useRef()

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    categories: yup.string().required('Required'),
    complexity: yup.string().required('Required'),
    description: yup.string().required('Required').notOneOf(['<p><br></p>'], 'Required')
  });
  const { questions, dispatch } = useQuestionsContext()
  const [error, setError] = useState(null)

  const [ categories, setCategories ] = useState(editedQn ? editedQn.categories : [])
  const [ inputCat, setInputCat ] = useState('')

  const removeCategory = (arr, cat) => {
    const index = arr.indexOf(cat)
    if (index > - 1) {
      arr.splice(index, 1)
    }
  }

  const handleSubmitFunct = () => {
    console.log("handleSubmit Called")
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
    const response = await post(user.token, question)
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
    const response = await patch(user.token, editedQn._id, question)
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
              categories: editedQn ? editedQn.categories.toString() : '',
              complexity: editedQn ? editedQn.complexity : '',
              description: editedQn ? editedQn.description : ''
            }}
            validateOnChange={false}
            innerRef={formRef}
          >
            {({ handleSubmit, handleChange, errors, values }) =>
              <Form noValidate onSubmit={handleSubmit}>
                
                {/* <div> { categories } </div> */}

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

                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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
                </Form.Group> */}

                {/* <label> Categories: </label>

                <Row className='align-items-center'>
                  <Col>
                    <Form.Control 
                      type='text'
                      name='category'
                      value={inputCat}
                      onChange={(e) => setInputCat(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <button 
                      type='button' 
                      onClick={() => {
                        setCategories([...categories, inputCat]);
                        setInputCat('')
                      }}> add </button>
                  </Col>
                </Row>

                <h5>
                { categories.map((c,i) => {
                  return (
                    <div
                      className='d-inline p-2 bg-primary text-white rounded'
                      key={i} 
                      onClick={() => setCategories(categories.filter(item => item !== c))}> 
                      {c} 
                    </div>)
                })}
                </h5> */}




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

                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Complexity</Form.Label>
                  <Form.Control
                    type="text"
                    name="complexity"
                    onChange={handleChange}
                    value={values.complexity}
                    isInvalid={!!errors.complexity}
                    className="mb-0"/>
                  <Form.Control.Feedback type="invalid">
                    {errors.complexity}</Form.Control.Feedback>

                </Form.Group> */}

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Complexity</Form.Label>
                  <Form.Select
                    required
                    name='complexity'
                    onChange={handleChange}
                    value={values.complexity}
                    isInvalid={!!errors.complexity}
                  >
                    {!values.complexity && <option> Select Complexity </option>}
                    <option value='Easy'> Easy </option>
                    <option value='Medium'> Medium </option>
                    <option value='Hard'> Hard </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.complexity}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* <div>
                  error title: { errors.title} <br/>
                  error description: { errors.description} <br/>
                </div> */}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label> Description </Form.Label>
                  <div style={{ height : 250, overflowY: 'auto'}}>
                      <ReactQuill 
                      name="description"
                      theme='snow' value={values.description}
                      onChange={(e)=> values.description = e}
                      isInvalid={!!errors.description}
                      style={{ height: 200 }}
                      />
                  </div>
                  <div className='error'> {errors.description} </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.description} </Form.Control.Feedback>
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
