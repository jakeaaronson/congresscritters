import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'test3',
        cors: true, // enable CORS
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
      
    },
    {
      http: {
        method: 'options',
        path: 'test3',
        cors: true, // enable CORS
      },
    },
  ],
};
