const typeDefs = `
  type Artist {
    id: ID!
    first_name: String
    last_name: String
    songs: [Song]
  }

  type Song {
    id: ID!
    title: String
    artist: Artist
    duration: Int
  }

  type Query {
    artists: [Artist]
    artist(id: ID!): Artist
    songs: [Song]
    song(id: ID!): Song
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
    deleteSong(
      id: ID!
    ): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
