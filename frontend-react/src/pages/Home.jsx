import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteQuestion, patch, post } from '../apis/QuestionApi';
import { useState } from 'react';
import '../styles/style.css';

const Home = () => {
  const defaultAddQuestion = {
    title: '',
    categories: [],
    complexity: '',
    description: '',
  };
  const defaultEditQuestion = {
    id: '',
    title: '',
    categories: [],
    complexity: '',
    description: '',
  };
  const [addQuestion, setAddQuestion] = useState(defaultAddQuestion);
  const [editQuestion, setEditQuestion] = useState(defaultEditQuestion);
  const [deleteQuestionId, setDeleteQuestionId] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await post(addQuestion);
      const json = await response.json();
      console.log(json);
      setAddQuestion(defaultAddQuestion)
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteQuestion({ id: deleteQuestionId });
      const json = await response.json();
      console.log(json);
      setDeleteQuestionId('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await patch(editQuestion);
      const json = await response.json();
      console.log(json);
      setEditQuestion(defaultEditQuestion);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddAddCategory = (e) => {
    e.preventDefault();
    let newCategories = [...addQuestion.categories];
    newCategories.push('');
    setAddQuestion((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const handleEditAddCategory = (e) => {
    e.preventDefault();
    let newCategories = [...editQuestion.categories];
    newCategories.push('');
    setEditQuestion((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  return (
    <div>
      {/* Add question form */}
      <h3>Add Question</h3>
      <form className="add-question-form">
        <label>Title:</label>
        <input
          name="title"
          type="text"
          onChange={(e) =>
            setAddQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={addQuestion.title}
        />
        <label>Categories:</label>
        {addQuestion.categories.map((cat, index) => (
          <input
            type="text"
            onChange={(e) =>
              setAddQuestion((prev) => {
                let newCategories = [...prev.categories];
                newCategories[index] = e.target.value;
                return {
                  ...prev,
                  categories: newCategories,
                };
              })
            }
            value={cat}
          />
        ))}
        <button onClick={(e) => handleAddAddCategory(e)}>Add category</button>
        <label>Complexity:</label>
        <input
          name="complexity"
          type="text"
          onChange={(e) =>
            setAddQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={addQuestion.complexity}
        />
        <label>Description:</label>
        <input
          name="description"
          type="text"
          onChange={(e) =>
            setAddQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={addQuestion.description}
        />
        <button type="submit" className='primary-btn' onClick={(e) => handleAddQuestion(e)}>Add question</button>
      </form>

      {/* Edit question form */}
      <h3>Edit Question</h3>
      <form className="edit-question-form">
        <label>Id:</label>
        <input
          name="id"
          type="text"
          onChange={(e) =>
            setEditQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={editQuestion.id}
        />
        <label>Title:</label>
        <input
          name="title"
          type="text"
          onChange={(e) =>
            setEditQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={editQuestion.title}
        />
        <label>Categories:</label>
        {editQuestion.categories.map((cat, index) => (
          <input
            type="text"
            onChange={(e) =>
              setEditQuestion((prev) => {
                let newCategories = [...prev.categories];
                newCategories[index] = e.target.value;
                return {
                  ...prev,
                  categories: newCategories,
                };
              })
            }
            value={cat}
          />
        ))}
        <button onClick={(e) => handleEditAddCategory(e)}>Add category</button>
        <label>Complexity:</label>
        <input
          name="complexity"
          type="text"
          onChange={(e) =>
            setEditQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={editQuestion.complexity}
        />
        <label>Description:</label>
        <input
          name="description"
          type="text"
          onChange={(e) =>
            setEditQuestion((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={editQuestion.description}
        />
        <button type="submit" className='primary-btn' onClick={(e) => handleEditQuestion(e)}>Edit question</button>
      </form>

      {/* Delete question */}
      <h3>Delete Question</h3>
      <form className="delete-question-form">
        <label>Id:</label>
        <input
          name="id"
          type="text"
          onChange={(e) => setDeleteQuestionId(e.target.value)}
          value={deleteQuestionId}
        />
        <button type="submit" className='primary-btn' onClick={(e) => handleDeleteQuestion(e)}>Delete question</button>
      </form>
      <button onClick={handleRegister}> Register </button>
    </div>
  );
};

export default Home;
