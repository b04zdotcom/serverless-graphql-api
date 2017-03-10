import AWS from 'aws-sdk';

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
