import * as dbArtists from '../../dynamo/artists';
import * as dbSongs from '../../dynamo/songs';

export default {
  Query: {
    songs: () => dbSongs.getSongs(),
    song: (_, args) => dbSongs.getSongById(args.id),
  },
  Mutation: {
    createSong: (_, args) => dbSongs.createSong(args),
    updateSong: (_, args) => dbSongs.updateSong(args),
    deleteSong: (_, args) => dbSongs.deleteSong(args),
  },
  Song: {
    artist: song => dbArtists.getArtistById(song.artist),
  },
};
