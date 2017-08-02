export default `
  type Artist {
    id: ID!
    first_name: String
    last_name: String
    songs: [Song]
  }

  type Query {
    artists: [Artist]
    artist(id: ID!): Artist
  }

  type Mutation {
    createArtist(
      first_name: String!
      last_name: String!
    ): Artist
    updateArtist(
      id: ID!
      first_name: String!
      last_name: String!
    ): Artist
    deleteArtist(
      id: ID!
    ): Artist
  }
`;
