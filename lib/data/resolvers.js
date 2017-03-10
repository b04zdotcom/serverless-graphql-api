import * as dbSongs from '../dynamo/songs';
import * as dbArtists from '../dynamo/artists';

const resolvers = {
  Query: {
    artist: (_, args) => dbArtists.getArtistById(args.id),
    songs: () => dbSongs.getSongs(),
    song: (_, args) => dbSongs.getSongById(args.id),
  },
  Mutation: {
    createSong: (_, args) => dbSongs.createSong(args),
    updateSong: (_, args) => dbSongs.updateSong(args),
    deleteSong: (_, args) => dbSongs.deleteSong(args),
  },
  Artist: {
    songs: artist => dbSongs.getSongsByArtist(artist.id),
  },
};

export default resolvers;
