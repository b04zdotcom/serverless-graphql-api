import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

import * as db from './dynamo';

const TableName = 'songs';

export function getSongs() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'artist',
      'duration',
    ],
  };

  return db.scan(params);
}

export function getSongById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function getSongsByArtist(artistId) {
  const params = {
    TableName,
    FilterExpression: 'artist = :artist_id',
    ExpressionAttributeValues: { ':artist_id': artistId },
  };

  return db.scan(params);
}

export function createSong(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      artist: args.artist,
      duration: args.duration,
    },
  };

  return db.createItem(params);
}

export function updateSong(args) {
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

  return db.updateItem(params, args);
}

export function deleteSong(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
