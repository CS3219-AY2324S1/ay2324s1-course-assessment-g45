async function post({ ...params }) {
  return fetch('/api/userProfiles/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export { post };
