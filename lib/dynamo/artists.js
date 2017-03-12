import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

import * as db from './dynamo';

const tableName = 'artists';

export function getArtists() {
  const attributes = [
    'id',
    'first_name',
    'last_name',
  ];

  return db.getAll(tableName, attributes);
}

export function getArtistById(id) {
  return db.getById(tableName, id);
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

export function updateArtist(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'artists',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':first_name': args.first_name,
      ':last_name': args.last_name,
    },
    UpdateExpression: 'SET first_name = :first_name, last_name = :last_name',
    ReturnValues: 'ALL_NEW',
  };

  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

export function deleteArtist(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'artists',
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
