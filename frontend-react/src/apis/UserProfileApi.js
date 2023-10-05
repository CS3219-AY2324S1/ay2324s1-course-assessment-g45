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

async function login({ ...params }) {
  return fetch(`${baseUrl}/api/userProfiles/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

async function updateUser(id, { ...params }) {
  return fetch(`${baseUrl}/api/UserProfiles/` + id, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

async function deleteUser(id) {
  return fetch(`${baseUrl}/api/userProfiles/` + id, {
    method: 'DELETE',
  });
}

export { post, login, updateUser, deleteUser };
