import fs from 'fs';
import path from 'path';
import server from 'graphql-server-lambda';
import { mergeStrings } from 'gql-merge';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './data/resolvers';

const typesDir = path.resolve(__dirname, 'data/types');
const typeFiles = fs.readdirSync(typesDir);
const types = typeFiles.map(file => fs.readFileSync(path.join(typesDir, file), 'utf-8'));
const typeDefs = mergeStrings(types);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    callback(error, outputWithHeader);
  };

  server.graphqlLambda({ schema })(event, context, callbackFilter);
};
