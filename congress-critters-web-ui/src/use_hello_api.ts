import fetch from 'node-fetch';

export const callApi = async () => {
  const url = 'https://3wyyz1x6lk.execute-api.us-east-1.amazonaws.com/dev/hello'; // replace with your actual API endpoint
  const data = {
    name: 'John'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result;
};

callApi()
  .then(result => console.log(result))
  .catch(error => console.error('An error occurred:', error));


