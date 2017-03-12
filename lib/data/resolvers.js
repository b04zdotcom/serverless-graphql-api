import * as dbSongs from '../dynamo/songs';
import * as dbArtists from '../dynamo/artists';

const resolvers = {
  Query: {
    artists: () => dbArtists.getArtists(),
    artist: (_, args) => dbArtists.getArtistById(args.id),
    songs: () => dbSongs.getSongs(),
    song: (_, args) => dbSongs.getSongById(args.id),
  },
  Mutation: {
    createArtist: (_, args) => dbArtists.createArtist(args),
    updateArtist: (_, args) => dbArtists.updateArtist(args),
    deleteArtist: (_, args) => dbArtists.deleteArtist(args),
    createSong: (_, args) => dbSongs.createSong(args),
    updateSong: (_, args) => dbSongs.updateSong(args),
    deleteSong: (_, args) => dbSongs.deleteSong(args),
  },
  Artist: {
    songs: artist => dbSongs.getSongsByArtist(artist.id),
  },
  Song: {
    artist: song => dbArtists.getArtistById(song.artist),
  },
};

export default resolvers;
