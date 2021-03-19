import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler  = async (event, context) => {
    console.log('Received event', event);
    return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
