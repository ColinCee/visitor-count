import { APIGatewayProxyHandler } from "aws-lambda";
import { GetOrInitVisitorCount, PutVisitorCount } from "./dynamoDb";

export const handler: APIGatewayProxyHandler = async () => {
  const visitorCount = await GetOrInitVisitorCount();
  await PutVisitorCount(visitorCount + 1);
  return {
    statusCode: 200,
    body: JSON.stringify({ count: visitorCount + 1 }),
  };
};
