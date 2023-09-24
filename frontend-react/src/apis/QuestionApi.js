async function getAllQuestions(token) {
  return fetch('/api/questions/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

async function post(token, { ...params }) {
  return fetch('/api/questions/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}

async function deleteQuestion(token, {id}) {
  return fetch(`/api/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

async function patch(token, id, {...params}) {
  return fetch(`/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}

export { getAllQuestions, post, deleteQuestion, patch };
