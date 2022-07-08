import { DynamoDB } from "@aws-sdk/client-dynamodb";

//Create a DynamoDB client
const dynamo = new DynamoDB({
  region: process.env.SCHEDULER_REGION,
});

//Send message in 20 minutes
const DEFAULT_DELAY = 20 * 60000;

export const handler = async (event: {
  queryStringParameters: {
    message?: string;
    author?: string;
    dateTimestamp?: string;
  };
}): Promise<unknown> => {
  //Initialize parameters from the queryStringParameters
  const message = event.queryStringParameters.message ?? "No message found";

  // Put data into the scheduler using the expected format
  // `TableName` being the table name provided by the scheduler object
  // `PK` being the partition key provided by the scheduler object
  // `SK` being the expected out timestamp ended with `#someid`
  // `payload` being any data that is expected to be forwarded to the consumer
  //
  // Note that the `MessageContent` key is not mandatory and any key / value pair
  // can be used here
  const response = await dynamo.putItem({
    TableName: process.env.SCHEDULER_TABLE_NAME ?? "TABLE_NOT_FOUND",
    Item: {
      pk: { S: process.env.SCHEDULER_PK ?? "PK_NOT_FOUND" },
      sk: { S: event.queryStringParameters.dateTimestamp ?? "SK_NOT_FOUND" },
      payload: {
        M: {
          MessageContent: { S: message },
          MessageAuthor: { S: event.queryStringParameters.author ?? "Anonymous" },
        },
      },
    },
  });

  return {
    statusCode: response.$metadata.httpStatusCode,
    body: "Completed",
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };
};
