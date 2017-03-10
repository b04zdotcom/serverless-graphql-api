const typeDefs = `
  type Song {
    id: ID!
    title: String
    artist: String
    duration: Int
  }

  type Query {
    songs: [Song]
    song(id: Int!): Song
  }

  type Mutation {
    createSong(
      title: String!
      artist: String!
      duration: Int!
    ): Song
    updateSong(
      id: ID!
      title: String
      artist: String
      duration: Int
    ): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
