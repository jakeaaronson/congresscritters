import fetch from 'node-fetch';
import { ClientJS } from 'clientjs';

export const callApi = async () => {

  const client = new ClientJS();

	// Get the client's fingerprint id
	const fingerPrintHash = client.getFingerprint();
	console.log('fingerprintHash');
	console.log(fingerPrintHash);

	const fingerPrintData = client.getBrowserData();
	console.log('fingerprintData');
	console.log(fingerPrintData);


  const url = 'https://orb9e3jc05.execute-api.us-east-1.amazonaws.com/dev/test3'; // replace with your actual API endpoint
  const data = {
    fingerPrintHash: fingerPrintHash.toString(),
    fingerPrintData,
    address: 'John'
  };

  console.log(data)

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


