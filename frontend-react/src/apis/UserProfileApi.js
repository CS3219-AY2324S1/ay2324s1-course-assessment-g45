
async function post({ ...params }) {
  return fetch('/api/userProfiles/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

async function login({...params}) {
  return fetch('/api/userProfiles/login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(params)
  })
}

async function updateUser(id, {...params}) {
  return fetch('/api/UserProfiles/' + id, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  })
}

async function deleteUser(id) {
  return fetch('/api/userProfiles/' + id , {
    method: 'DELETE'
  })
}

export { post, login, updateUser, deleteUser };