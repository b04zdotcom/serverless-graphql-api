import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

import * as db from './dynamo';

const tableName = 'songs';

export function getSongs() {
  const attributes = [
    'id',
    'title',
    'artist',
    'duration',
  ];

  return db.getAll(tableName, attributes);
}

export function getSongById(id) {
  return db.getById(tableName, id);
}

export function getSongsByArtist(artistId) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) =>
    dynamoDb.scan({
      TableName: 'songs',
      FilterExpression: 'artist = :artist_id',
      ExpressionAttributeValues: { ':artist_id': artistId },
    }).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function createSong(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'songs',
    Item: {
      id: uuid(),
      title: args.title,
      artist: args.artist,
      duration: args.duration,
    },
  };

  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

export function updateSong(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'songs',
    Key: {
      id: args.id,
    },
    ExpressionAttributeNames: {
      '#song_duration': 'duration',
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':artist': args.artist,
      ':duration': args.duration,
    },
    UpdateExpression: 'SET title = :title, artist = :artist, #song_duration = :duration',
    ReturnValues: 'ALL_NEW',
  };

  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

export function deleteSong(args) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'songs',
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
