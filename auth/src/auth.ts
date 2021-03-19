import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerHandler, APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const handler: APIGatewayAuthorizerHandler =  function(event, context, callback) {
  console.log(event)
  if (!isTokenEvent(event)) {
    callback("Unauthorized");   // Return a 401 Unauthorized response
    return
  }

  const token = event.authorizationToken
  switch (token) {
      case 'allow':
          callback(null, generatePolicy('user', 'Allow', event.methodArn));
          break;
      case 'unauthorized':
          callback("Unauthorized");   // Return a 401 Unauthorized response
          break;
      default:
          callback("Error: Invalid token"); // Return a 500 Invalid token response
  }
};

const isTokenEvent = (event: APIGatewayAuthorizerEvent): event is APIGatewayTokenAuthorizerEvent => {
  return event.hasOwnProperty("authorizationToken")
}

const generatePolicy = function(principalId: string, effect: string, resource: string): APIGatewayAuthorizerResult {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {"Action":  'execute-api:Invoke',
        Effect: effect,
        Resource: resource
       }
      ]
    }
  };
}
