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
// import { getAllQuestions, deleteQuestion, patch, post } from '../../apis/QuestionApi';
import { useUserContext } from '../../hooks/useUserContext';

const QuestionForm = ({ editedQn, handleClose, formTitle }) => {
  const { Formik } = formik
  const formRef = useRef()

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    categories: yup.array().of(yup.string()).min(1, 'Required'),
    complexity: yup.string().required('Required'),
    description: yup.string().required('Required').notOneOf(['<p><br></p>'], 'Required')
  });
  const { questions, dispatch } = useQuestionsContext()
  const [error, setError] = useState(null)
  const { user } = useUserContext();

  const [categoryList, setCategoryList] = useState(editedQn ? editedQn.categories : [])
  const [newCategory, setNewCategory] = useState('')

  const addCategory = (category) => {
    setCategoryList((prevCategories) => [...prevCategories, category])
  }

  const removeCategory = (category) => {
    setCategoryList((prevCategories) => prevCategories.filter((item) => item !== category))
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
              categories: editedQn ? editedQn.categories : [],
              complexity: editedQn ? editedQn.complexity : '',
              description: editedQn ? editedQn.description : ''
            }}
            validateOnChange={false}
            innerRef={formRef}
          >
            {({ handleSubmit, handleChange, errors, values, setFieldValue }) =>
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Categories</Form.Label>
                  {categoryList.map((category) =>
                    <Button
                      className='me-2 mb-2 btn-custom'
                      onClick={() => {
                        const tempArr = [...categoryList]
                        removeCategory(category);
                        setFieldValue('categories', tempArr.filter((item) => item !== category))
                      }}
                    >
                      {category}
                      <i class="fas fa-times ps-2"></i>
                    </Button>
                  )}
                  <input type='text' value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
                  <Button
                    variant='success'
                    onClick={() => {
                      if (newCategory.length > 0 && !categoryList.includes(newCategory)) {
                        addCategory(newCategory);
                        setFieldValue('categories', [...categoryList, newCategory])
                        setNewCategory('');
                      }
                    }}
                  >
                    Add Category
                  </Button>

                  <Form.Control
                    type="hidden"
                    name="categories"
                    isInvalid={!!errors.categories}
                    className="mb-0" />
                  <Form.Control.Feedback type="invalid">
                    {errors.categories}</Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label> Description </Form.Label>
                  <div style={{ height: 250, overflowY: 'auto' }}>
                    <ReactQuill
                      name="description"
                      theme='snow' value={values.description}
                      onChange={(e) => values.description = e}
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
