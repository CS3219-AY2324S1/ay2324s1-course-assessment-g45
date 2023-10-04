import Config from '../Config';

const baseUrl = Config.Common.MatchingApiBaseUrl;

async function post({ ...params }) {
  return fetch(`${baseUrl}/api/matching/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { post };
