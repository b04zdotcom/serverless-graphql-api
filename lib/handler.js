import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './data/resolvers';

const typesArray = fileLoader(path.join(__dirname, './data/types'));
const typeDefs = mergeTypes(typesArray);

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

  graphqlLambda({ schema })(event, context, callbackFilter);
};
