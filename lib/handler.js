import fs from 'fs';
import path from 'path';
import { mergeStrings } from 'gql-merge';
import server from 'graphql-server-lambda';
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

module.exports.graphql = server.graphqlLambda({ schema });
module.exports.graphiql = server.graphiqlLambda({
  endpointURL: '/prod/graphql',
});
