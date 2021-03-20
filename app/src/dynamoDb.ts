import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const TableName = "visitor_count";

export const PutVisitorCount = async (count: number) => {
  const client = new DynamoDBClient({ region: "eu-west-1" });

  const putItemCommand = new PutItemCommand({
    TableName,
    Item: {
      id: { N: "1" },
      count: { N: `${count}` },
    },
  });
  return client.send(putItemCommand);
};

export const GetOrInitVisitorCount = async () => {
  const client = new DynamoDBClient({ region: "eu-west-1" });
  const getItemCommand = new GetItemCommand({
    TableName,
    Key: { id: { N: "1" } },
  });

  const output = await client.send(getItemCommand);
  if (!output.Item || !output.Item.count) {
    await PutVisitorCount(0);
    return 0;
  }
  return Number(output.Item.count.N);
};
