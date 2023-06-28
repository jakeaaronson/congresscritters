import type { AWS } from '@serverless/typescript';

//type MyEnvironment = 'dev' | 'prod';
//const environment: MyEnvironment =  process.env.STAGE === 'prod' ? 'prod' : 'dev';

import hello from '@functions/hello';
import test1 from '@functions/test1';

const serverlessConfiguration: AWS = {
  service: 'congress-critters-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    stage: '${opt:stage, "dev"}',
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
    /*iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['s3:*'],
      Resource: [
        `arn:aws:s3:::${environment}-transactional-log-congress-critters`,
        `arn:aws:s3:::${environment}--transactional-log-congress-critters/*`,
      ],
    },
  ],*/
  // import the function via paths
  functions: { hello,test1 },


  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    apiGatewayCustomizer: { //not sure if we want this
      // Add your CORS configuration here
      cors: {
        origins: ['*'], // Set the allowed origins here
        headers: ['Content-Type', 'Authorization'], // Set the allowed headers here
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'], // Set the allowed methods here
      },
    }
  },
  resources: {
    Resources: {
      TransactionalLogBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${opt:stage, "dev"}-transactional-log-congress-critters',
        },
      }
    }
  }
};

module.exports = serverlessConfiguration;
