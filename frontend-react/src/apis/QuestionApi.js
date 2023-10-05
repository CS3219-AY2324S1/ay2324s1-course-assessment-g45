import Config from '../Config';

const baseUrl = Config.Common.QuestionApiBaseUrl;

async function getAllQuestions(token) {
  return fetch(`${baseUrl}/api/questions/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

async function post(token, { ...params }) {
  return fetch(`${baseUrl}/api/questions/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}


async function deleteQuestion(token, { id }) {
  return fetch(`${baseUrl}/api/questions/${id}`, {
    method: 'DELETE',
  });
}


async function patch(token, id, { ...params }) {
  return fetch(`${baseUrl}/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { getAllQuestions, post, deleteQuestion, patch };
