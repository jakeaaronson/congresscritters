import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


import { S3 } from 'aws-sdk';


import schema from './schema';

const initWithFIngerprints: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const s3 = new S3();

  
  //"dev-transactional-log-congress-critters"
 // '${opt:stage, "dev"}-transactional-log-congress-critters
  return formatJSONResponse({
    message: `Success`
  });
};

export const main = middyfy(initWithFIngerprints);
