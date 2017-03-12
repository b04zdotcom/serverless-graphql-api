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

export function createItem(TableName, Item) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName,
    Item,
  };

  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

export function deleteItem(TableName, args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}
