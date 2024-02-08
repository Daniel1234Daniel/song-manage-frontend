import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

interface Genre {
count:number;
genre: string;
}
interface albumSong {
    totalSongs:number;
    album: string;
    }

    interface albumSongArtist {
        totalSongs:number;
        totalAlbums: number;
        artist:string;
        }


interface SongsState {
    list: Song[];
    statics?: {
        totalSongs: number;
        totalArtists: number;
        totalAlbums: number;
        totalGenres: number;
    };
    filteredList: Song[];
    staticsGeners: Genre[];
    staticsAlbumSong:albumSong[];
    staticsAlbumSongArtist:albumSongArtist[];

    
}

const initialState: SongsState = {
    list: [],
    staticsGeners: [],
    staticsAlbumSong:[],
    staticsAlbumSongArtist:[],

    statics: {
        totalSongs: 0,
        totalArtists: 0,
        totalAlbums: 0,
        totalGenres: 0,
    },
    filteredList: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.list = action.payload;
        },
        setStatics: (state, action: PayloadAction<any>) => {
            state.statics = action.payload;
        },
        setStaticsGeners: (state, action: PayloadAction<any>) => {
            state.staticsGeners = action.payload;
        },
        setStaticsAlbumSOng: (state, action: PayloadAction<any>) => {
            state.staticsAlbumSong = action.payload;
        },
        setStaticsAlbumSOngArtist: (state, action: PayloadAction<any>) => {
            state.staticsAlbumSongArtist = action.payload;
        },
        createSong: (state, action: PayloadAction<Song>) => {
            state.list.push(action.payload);
        },
        updateExistingSong: (state, action) => {
            console.log('Received action:', action);
            const updatedSong = action.payload;
            console.log('Updated song:', updatedSong);
      
            const index = state.list.findIndex(song => song._id === updatedSong._id);
            if (index !== -1) {
              state.list[index] = updatedSong;
            }
          },
        deleteExistingSong: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(song => song._id !== action.payload);
        },
        setFilteredList: (state, action: PayloadAction<Song[]>) => {
            state.filteredList = action.payload;
        },
    },
});

export const { setSongs, createSong,setStaticsAlbumSOngArtist, setStaticsAlbumSOng,updateExistingSong, deleteExistingSong ,setStatics,setFilteredList,setStaticsGeners} = songsSlice.actions;
export default songsSlice.reducer;
