// rootSaga.js
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getAllSongs,
  getAllStaticSongs,
  getAllStaticgenres,
  getAllStaticSongAlbum,
  getAllStaticartists,
  addSong as addSongAPI,
  updateSong as updateSongAPI,
  deleteSong as deleteSongAPI,
  filterSong as filterSongAPI
} from '../api/api';
import { setSongs, createSong, setStaticsAlbumSOngArtist,updateExistingSong,setStaticsAlbumSOng, deleteExistingSong,setStatics,setFilteredList ,setStaticsGeners} from './songsSlice';

function* fetchSongs(): Generator<any, void, any> {
  try {
    const response = yield call(getAllSongs);
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}
function* fetchStatcSongs(): Generator<any, void, any> {
    try {
      const response = yield call(getAllStaticSongs);
      yield put(setStatics(response.data));
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }
  function* fetchStatcgenres(): Generator<any, void, any> {
    try {
      const response = yield call(getAllStaticgenres);
      console.log(response)
      yield put(setStaticsGeners(response.data));
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }
  function* fetchStatcSongAlbum(): Generator<any, void, any> {
    try {
      const response = yield call(getAllStaticSongAlbum);
      console.log(response)
      yield put(setStaticsAlbumSOng(response.data));
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }

  function* fetchStatcSongAlbumArtist(): Generator<any, void, any> {
    try {
      const response = yield call(getAllStaticartists);
      console.log(response)
      yield put(setStaticsAlbumSOngArtist(response.data));
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }


function* addSong(action: any): Generator<any, void, any> {
  try {
    const {  song } = action.payload;

    const response = yield call(addSongAPI, song);
    yield put(createSong(response));
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

function* updateSong(action: any): Generator<any, void, any> {
    try {
      const { id, song } = action.payload;
      const response = yield call(updateSongAPI, id, song);
  
      console.log('Response from updateSongAPI:', response);
  
      // Make sure response.data has the expected structure
       // Assuming the updated song is directly in response.data
      yield put(updateExistingSong(response));
    } catch (error) {
      console.error('Error updating song:', error);
    }
  }

  function* filterSong(action: any): Generator<any, void, any> {
    try {
      const  genreFilter  = action.payload;
      console.log(genreFilter)
      const response = yield call(filterSongAPI, genreFilter);
  
      console.log('Response from updateSongAPI:', response);
  
      // Make sure response.data has the expected structure
       // Assuming the updated song is directly in response.data
      yield put(setFilteredList(response));
    } catch (error) {
      console.error('Error updating song:', error);
    }
  }
  
  function* deleteSong(action: any): Generator<any, void, any> {
    try {
      const id = action.payload;
      yield call(deleteSongAPI, id);
      yield put(deleteExistingSong(id));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  }

function* rootSaga(): Generator<any, void, any> {
  yield all([
    takeLatest('songs/fetchSongs', fetchSongs),
    takeLatest('songs/fetchStaticSongs', fetchStatcSongs),

    takeLatest('songs/addSong', addSong),
    takeLatest('songs/updateSong', updateSong),
    takeLatest('songs/deleteSong', deleteSong),
    takeLatest('songs/filterSong', filterSong),
    takeLatest('songs/fetchStaticGenres', fetchStatcgenres),
    takeLatest('songs/fetchStaticSongAlbum', fetchStatcSongAlbum),
    takeLatest('songs/fetchStaticSongAlbumArtist', fetchStatcSongAlbumArtist),

    




  ]);
}

export default rootSaga;
