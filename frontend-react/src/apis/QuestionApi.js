async function getAllQuestions() {
  return fetch('/api/questions/', {
    method: 'GET'
  });
}

async function post({ ...params }) {
  return fetch('/api/questions/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

async function deleteQuestion({ id }) {
  return fetch(`/api/questions/${id}`, {
    method: 'DELETE',
  });
}

async function patch(id, {...params}) {
  return fetch(`/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { getAllQuestions, post, deleteQuestion, patch };
