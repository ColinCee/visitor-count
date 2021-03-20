import { APIGatewayAuthorizerHandler } from "aws-lambda";
import generatePolicy from "./generatePolicy";
import hasCorrectParams from "./hasCorrectParams";
import isHashValid from "./isHashValid";
import isTimeValid from "./isTimeValid";

export const handler: APIGatewayAuthorizerHandler = (
  event,
  context,
  callback
) => {
  if (!hasCorrectParams(event)) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
    return;
  }
  const { time, hash } = event;
  if (!isTimeValid(time) || !isHashValid(time, hash)) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
    return;
  }

  callback(null, generatePolicy("user", "Allow", event.methodArn));
};
