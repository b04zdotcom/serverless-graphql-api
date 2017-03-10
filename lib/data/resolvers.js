import * as dynamo from '../dynamo';

const resolvers = {
  Query: {
    songs: () => dynamo.getSongs(),
    song: (_, args) => dynamo.getSongById(args.id),
  },
  Mutation: {
    createSong: (_, args) => dynamo.createSong(args),
    updateSong: (_, args) => dynamo.updateSong(args),
  },
};

export default resolvers;
