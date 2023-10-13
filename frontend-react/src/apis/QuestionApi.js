import Config from '../Config';

const baseUrl = Config.Common.QuestionApiBaseUrl;

async function getAllQuestions() {
  return fetch(`${baseUrl}/api/questions/`, {
    method: 'GET',
  });
}

async function getQuestionById({ id }) {
  return fetch(`${baseUrl}/api/questions/${id}`, {
    method: 'GET',
  })
}

async function post({ ...params }) {
  return fetch(`${baseUrl}/api/questions/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

async function deleteQuestion({ id }) {
  return fetch(`${baseUrl}/api/questions/${id}`, {
    method: 'DELETE',
  });
}

async function patch(id, { ...params }) {
  return fetch(`${baseUrl}/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { 
  getAllQuestions, 
  getQuestionById,
  post, 
  deleteQuestion, 
  patch 
};
