import fs from 'fs';
import path from 'path';
import { mergeStrings } from 'gql-merge';
import server from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './data/resolvers';

const typesFolder = path.resolve(__dirname, 'data/types');
const typeFiles = fs.readdirSync(typesFolder);
const types = typeFiles.map(file => fs.readFileSync(`${typesFolder}/${file}`, 'utf-8'));
const typeDefs = mergeStrings(types);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports.graphql = server.graphqlLambda({ schema });
module.exports.graphiql = server.graphiqlLambda({
  endpointURL: '/prod/graphql',
});
