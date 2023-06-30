import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';



export const test2: APIGatewayProxyHandler = async (event, _context) => {
  // your function logic here

  const s3 = new S3();

  await s3.putObject({
    Bucket:  'dev-transactional-log-congress-critters',
    Key: `test2-${Date.now()}.txt`,
    Body:  `${Date.now()} we added some data from test2`,
  }).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message: 'Hello world!',
    }),
  };
};
export const main = middyfy(test2);


