import axios from 'axios';

const baseUrl = "https://judge0-ce.p.rapidapi.com/submissions/"

async function checkStatus (token) {
  return fetch(`${baseUrl}` + `${token}`, {
    method: "GET",
    params: { fields: "*" },
    headers: {
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    }
  })

  
  const options = {
    method: "GET",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token)
      }, 2000)
      return
    } else {
      // setProcessing(false)
      // setOutputDetails(response.data)
      //showSuccessToast(`Compiled Successfully!`)
      console.log("Compile success")
      console.log('response.data', response.data)
      return
    }
  } catch (err) {
    console.log("err", err);
    // setProcessing(false);
    //showErrorToast();
  }
};

async function compile({ ...data }) {
  return fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    params: {
      fields: '*'
    },
    body: JSON.stringify(data),
  })
}

export {
  compile,
  checkStatus,

}