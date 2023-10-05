import Config from '../Config';

const baseUrl = Config.Common.UserApiBaseUrl;

async function post({ ...params }) {
  return fetch(`${baseUrl}/api/userProfiles/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

async function loginUser({ ...params }) {
  return fetch(`${baseUrl}/api/userProfiles/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}


async function updateUser(token, id, { ...params }) {
  return fetch(`${baseUrl}/api/UserProfiles/` + id, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}

async function deleteUser(token, id) {
  return fetch(`${baseUrl}/api/userProfiles/` + id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
      }
  });
}

export { post, loginUser, updateUser, deleteUser };
