import Config from "../Config";

const baseUrl = Config.Common.CollabSessionApiBaseUrl;

async function getSession({sessionId}) {
  return fetch(`${baseUrl}/api/collabSession/${sessionId}`, {
    method: 'GET',
  })
}

async function createSession({...params}) {
  return fetch(`${baseUrl}/api/collabSession/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    }
  })
}

async function updateSession(id, {...params}) {
  return fetch(`${baseUrl}/api/collabSession/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    }
  })
}

export {
  getSession,
  createSession,
  updateSession,
}

