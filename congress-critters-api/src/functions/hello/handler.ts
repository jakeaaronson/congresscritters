import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const s3 = new S3();

  const fileContent =  `${Date.now()} we added some data`
  const bucketName = 'dev-transactional-log-congress-critters'; // replace with your bucket name
  const key = `hello-${Date.now()}.txt`; // generate a unique file name

 
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
    };
    await s3.putObject(params).promise();

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
