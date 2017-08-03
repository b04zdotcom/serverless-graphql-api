# Serverless GraphQL API using Lambda and DynamoDB
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/boazdejong/serverless-graphql-api.svg?branch=master)](https://travis-ci.org/boazdejong/serverless-graphql-api)

GraphQL Lambda Server using [graphql-server-lambda](https://github.com/apollographql/graphql-server/tree/master/packages/graphql-server-lambda) from [Apollo](http://dev.apollodata.com/).

[graphql-tools](https://github.com/apollographql/graphql-tools) and [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas) are used to generate the schema.

[serverless-webpack](https://github.com/elastic-coders/serverless-webpack) is used to transform ES6 with [Babel](https://babeljs.io/) and build the lambda.


## Setup
Clone the repository and install the packages.

```
git clone https://github.com/boazdejong/serverless-graphql-api
cd serverless-graphql-api
npm install
```

## Deploy
Run the `deploy` script to create the Lambda Function and API Gateway for GraphQL. This also creates two DynamoDB tables named `artists` and `songs`
```
npm run deploy
```

## Queries and Mutations
Query the GraphQL server using the [GraphiQL.app](https://github.com/skevy/graphiql-app). If you have Homebrew installed on OSX run
```
brew cask install graphiql
```

### Mutations
The following mutations are available in this example.

#### createArtist()
Create an artist providing the first and last name as arguments. The id will be a generated uuid.
```graphql
mutation {
  createArtist(first_name: "Billy", last_name: "Crash") {
    id
  }
}
```

#### createSong()
Using the generated id from the artist you can create a song with the following mutation. Also provide a title and duration.
```graphql
mutation {
  createSong(artist: "99a746e0-0734-11e7-b2fd-45ae0a3b9074", title: "Whatever", duration: 120) {
    id
  }
}
```

#### updateArtist()
```graphql
mutation {
  updateArtist(id: "99a746e0-0734-11e7-b2fd-45ae0a3b9074", first_name: "John", last_name: "Ruth") {
    id
    first_name
    last_name
  }
}
```

#### updateSong()
```graphql
mutation {
  updateSong(id: "a8a0a060-071b-11e7-bd09-8562f101f7c2", artist: "99a746e0-0734-11e7-b2fd-45ae0a3b9074", duration: 130, title: "A new title") {
    id
  }
}
```

### Queries
#### Example query
```graphql
{
  songs {
    id
    title
    duration
    artist {
      id
      first_name
      last_name
    }
  }
}
```

This query will return a result similar to this
```json
{
  "data": {
    "songs": [
      {
        "id": "a8a0a060-071b-11e7-bd09-8562f101f7c2",
        "title": "Whatever",
        "duration": 120,
        "artist": {
          "id": "99a746e0-0734-11e7-b2fd-45ae0a3b9074",
          "first_name": "Billy",
          "last_name": "Crash"
        }
      }
    ]
  }
}
```
