import { APIGatewayProxyHandler } from "aws-lambda";
import { GetOrInitVisitorCount, PutVisitorCount } from "./dynamoDb";

export const handler: APIGatewayProxyHandler = async () => {
  const visitorCount = await GetOrInitVisitorCount();
  await PutVisitorCount(visitorCount + 1);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify({ count: visitorCount + 1 }),
  };
};
