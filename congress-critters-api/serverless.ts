import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import test1 from '@functions/test1';
import test2 from '@functions/test2';
import test3 from '@functions/test3';

const serverlessConfiguration: AWS = {
  service: 'congress-critters-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-domain-manager'], // Add the plugin
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
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:ListBucket',
              's3:GetObject',
              's3:PutObject',
              's3:DeleteObject',
            ],
            Resource: [
              'arn:aws:s3:::${opt:stage, "dev"}-transactional-log-congress-critters',
              'arn:aws:s3:::${opt:stage, "dev"}-transactional-log-congress-critters/*',
            ],
          },
        ],
      },
    },
  },

  // import the function via paths
  functions: { hello, test1, test2, test3 },

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
    customDomain: {
      domainName: '${file(${self:provider.stage}.config.json):domainName}',
      stage: '${self:provider.stage, "dev"}',
      createRoute53Record: true,
      endpointType: 'regional',
      securityPolicy: 'tls_1_2',
      certificateName: '${file(${self:provider.stage}.config.json):domainName}',
      basePath: '',
      certificateArn: '${file(${self:provider.stage}.config.json):certificateArn}',
    },
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
