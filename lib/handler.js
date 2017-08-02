import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';

import resolvers from './data/resolvers';

import artistType from './data/types/artist';
import songType from './data/types/song';

const typeDefs = mergeTypes([artistType, songType]);

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
