import Config from '../Config';

const baseUrl = Config.Common.ChatGPTApiBaseUrl;

async function post(token, { ...params }) {
    return fetch(`${baseUrl}/api/chatgpt/`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
}


export {post};