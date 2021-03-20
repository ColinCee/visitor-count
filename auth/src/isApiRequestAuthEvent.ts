import {
  APIGatewayAuthorizerEvent,
  APIGatewayRequestAuthorizerEvent,
} from "aws-lambda";

export default (
  event: APIGatewayAuthorizerEvent
): event is APIGatewayRequestAuthorizerEvent => {
  return Object.prototype.hasOwnProperty.call(event, "queryStringParameters");
};
