import Config from "../Config";

const baseUrl = Config.Common.CollabSessionApiBaseUrl;

async function getSession({sessionId}) {
  return fetch(`${baseUrl}/api/collabSession/${sessionId}`, {
    method: 'GET',
  })
}

export {
  getSession
}

