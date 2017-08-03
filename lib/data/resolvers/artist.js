import * as dbArtists from '../../dynamo/artists';
import * as dbSongs from '../../dynamo/songs';

export default {
  Query: {
    artists: () => dbArtists.getArtists(),
    artist: (_, args) => dbArtists.getArtistById(args.id),
  },
  Mutation: {
    createArtist: (_, args) => dbArtists.createArtist(args),
    updateArtist: (_, args) => dbArtists.updateArtist(args),
    deleteArtist: (_, args) => dbArtists.deleteArtist(args),
  },
  Artist: {
    songs: artist => dbSongs.getSongsByArtist(artist.id),
  },
};
