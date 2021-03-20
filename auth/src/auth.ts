import { APIGatewayAuthorizerHandler } from "aws-lambda";
import generatePolicy from "./generatePolicy";
import isApiRequestAuthEvent from "./isApiRequestAuthEvent";

import isHashValid from "./isHashValid";
import isTimeValid from "./isTimeValid";

export const handler: APIGatewayAuthorizerHandler = (
  event,
  context,
  callback
) => {
  console.log(event);
  if (!isApiRequestAuthEvent(event) || !event.queryStringParameters) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
    return;
  }

  const { time, hash } = event.queryStringParameters;
  if (!time || !hash) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
    return;
  }
  if (!isTimeValid(time) || !isHashValid(time, hash)) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
    return;
  }

  callback(null, generatePolicy("user", "Allow", event.methodArn));
};
