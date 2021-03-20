import {
  APIGatewayAuthorizerEvent,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";

type CorrectParams = APIGatewayTokenAuthorizerEvent & {
  time: number;
  hash: string;
};
export default (event: APIGatewayAuthorizerEvent): event is CorrectParams => {
  return (
    Object.prototype.hasOwnProperty.call(event, "time") &&
    Object.prototype.hasOwnProperty.call(event, "hash")
  );
};
