import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

export function getArtists() {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) =>
    dynamoDb.scan({
      TableName: 'artists',
      AttributesToGet: [
        'id',
        'first_name',
        'last_name',
      ],
    }).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function getArtistById(id) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) =>
    dynamoDb.get({
      TableName: 'artists',
      Key: {
        id,
      },
    }).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}

export function createArtist(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'artists',
    Item: {
      id: uuid(),
      first_name: args.first_name,
      last_name: args.last_name,
    },
  };

  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}
