import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'artists';

export function getArtists() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'first_name',
      'last_name',
    ],
  };

  return db.scan(params);
}

export function getArtistById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createArtist(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      first_name: args.first_name,
      last_name: args.last_name,
    },
  };

  return db.createItem(params);
}

export function updateArtist(args) {
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

  return db.updateItem(params, args);
}

export function deleteArtist(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
