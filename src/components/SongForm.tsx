import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSong, updateSong as updateSongAction } from '../api/api';
import { setSongs, deleteExistingSong, updateExistingSong } from '../redux/songsSlice';
import styled from '@emotion/styled';

interface SongFormProps {
  existingSong?: any;
}

const Form = styled.form`
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`


  width: 50%;
  padding: 12px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SongForm: React.FC<SongFormProps> = ({ existingSong }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: existingSong?.title || '',
    artist: existingSong?.artist || '',
    album: existingSong?.album || '',
    genre: existingSong?.genre || '',
  });
  useEffect(() => {
    // Fetch songs from the Redux store
    dispatch({ type: 'songs/fetchSongs' });
    dispatch({ type: 'songs/fetchStaticSongs' });
    dispatch({ type: 'songs/fetchStaticGenres' });
    dispatch({ type: 'songs/fetchStaticSongAlbum' });
    dispatch({ type: 'songs/fetchStaticSongAlbumArtist'});

  }, [dispatch]);

  useEffect(() => {
    setFormData({
      title: existingSong?.title || '',
      artist: existingSong?.artist || '',
      album: existingSong?.album || '',
      genre: existingSong?.genre || '',
    });
  }, [existingSong]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (existingSong) {
        dispatch({
          type: 'songs/updateSong',
          payload: { id: existingSong._id, song: formData },
        });
        dispatch({ type: 'songs/fetchSongs' });
        dispatch({ type: 'songs/fetchStaticSongs' });
        dispatch({ type: 'songs/fetchStaticGenres' });
        dispatch({ type: 'songs/fetchStaticSongAlbum' });
        dispatch({ type: 'songs/fetchStaticSongAlbumArtist'});

        
      } else {
        dispatch({
          type: 'songs/addSong',
          payload: { song: formData },
        });
        dispatch({ type: 'songs/fetchSongs' });
        dispatch({ type: 'songs/fetchStaticSongs' });
        dispatch({ type: 'songs/fetchStaticGenres' });
        dispatch({ type: 'songs/fetchStaticSongAlbum' });
        dispatch({ type: 'songs/fetchStaticSongAlbumArtist'});
      
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Title:
      </Label>
      <Input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

      <Label>
        Artist:
      </Label>
      <Input type="text" name="artist" value={formData.artist} onChange={handleInputChange} required />

      <Label>
        Album:
      </Label>
      <Input type="text" name="album" value={formData.album} onChange={handleInputChange} required />

      <Label>
        Genre:
      </Label>
      <Input type="text" name="genre" value={formData.genre} onChange={handleInputChange} required />

      <Button type="submit">{existingSong ? 'Update Song' : 'Add Song'}</Button>
    </Form>
  );
};

export default SongForm;
