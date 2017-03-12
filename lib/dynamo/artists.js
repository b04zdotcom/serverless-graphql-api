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
  const item = {
    id: uuid(),
    first_name: args.first_name,
    last_name: args.last_name,
  };

  return db.createItem(tableName, item);
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

  return db.updateItem(args, params);
}

export function deleteArtist(args) {
  return db.deleteItem(tableName, args);
}
