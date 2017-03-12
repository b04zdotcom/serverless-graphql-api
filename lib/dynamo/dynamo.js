import AWS from 'aws-sdk';

export function getAll(TableName, AttributesToGet) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) =>
    dynamoDb.scan({
      TableName,
      AttributesToGet,
    }).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function getById(TableName, id) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) =>
    dynamoDb.get({
      TableName,
      Key: {
        id,
      },
    }).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}
