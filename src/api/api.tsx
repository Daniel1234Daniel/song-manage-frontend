import axios from 'axios';
import { updateExistingSong, createSong ,deleteExistingSong} from '../redux/songsSlice';
const API_BASE_URL = 'https://manage-song.onrender.com/api';

export const getAllSongs = () => axios.get(`https://manage-song.onrender.com/api/songs`);
export const getAllStaticSongs = () => axios.get(`https://manage-song.onrender.com/api/songs/statistics`);
export const getAllStaticgenres = () => axios.get(`https://manage-song.onrender.com/api/songs/statistics/genres`);
export const getAllStaticartists = () => axios.get(`https://manage-song.onrender.com/api/songs/statistics/artists`);
export const getAllStaticSongAlbum = () => axios.get(`https://manage-song.onrender.com/api/songs/statistics/albumsong`);





export const updateSong = async (id: string, song: any) => {
    console.log('Updating song:', id, song);
    try {
      const response = await axios.patch(`${API_BASE_URL}/songs/${id}`, song);
      return response.data; // Make sure this contains the updated song data
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  };
  
  
  export const addSong = async (song: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/songs`, song);
      return response.data; // Make sure this contains the updated song data

    } catch (error) {
      console.error('Error adding song:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };
  export const deleteSong = async (id: string) => {
    console.log(id,"dsadsadsadasdasdsadasdasdas")
    try {
        const response =    await axios.delete(`${API_BASE_URL}/songs/${id}`);
        return response.data; // Make sure this contains the updated song data

    } catch (error) {
      console.error('Error deleting song:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };
//   /genre/:genre
  export const filterSong = async (genre: string) => {
    console.log(genre,"dsadsadsadasdasdsadasdasdas")
    try {
        const response =    await axios.get(`${API_BASE_URL}/songs/genre/${genre}`);
        return response.data; // Make sure this contains the updated song data

    } catch (error) {
      console.error('Error deleting song:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  };
export const getStatistics = () => axios.get(`${API_BASE_URL}/songs/statistics`);
