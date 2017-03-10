import graphql from 'graphql';
import server from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './data/types';
import resolvers from './data/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports.graphql = server.graphqlLambda({ schema });
module.exports.graphiql = server.graphiqlLambda({
  endpointURL: '/prod/graphql',
});
