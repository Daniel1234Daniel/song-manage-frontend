import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs, deleteExistingSong } from './redux/songsSlice';
import { getAllStaticSongs, addSong } from './api/api';
import SongForm from './components/SongForm'; // Import the SongForm component
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 8px;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableRow = styled.tr`
  background-color: #f7f5f5;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 15px;
`;

const ActionButtonEdit = styled.button`
  padding: 10px 15px;
  margin-right: 5px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #32a852;
  cursor: pointer;
  color: white;
`;

const ActionButtonDelete = styled.button`
  padding: 10px 15px;
  margin-right: 5px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #750105;
  cursor: pointer;
  color: white;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state: any) => state.songs.list);
  const filteredSongs = useSelector((state: any) => state.songs.filteredList);
  const filteredSongsstatics = useSelector((state: any) => state.songs.statics);
  const songsGeners= useSelector((state: any) => state.songs.staticsGeners);
  const songAlbum=useSelector((state: any) => state.songs.staticsAlbumSong);
  const songAlbumArtist=useSelector((state: any) => state.songs.staticsAlbumSongArtist);

  



  const [genreFilter, setGenreFilter] = useState('');
  const [selectedSong, setSelectedSong] = useState<any>(null);

 

  const handleDeleteSong = (id: string) => {
    dispatch({
      type: 'songs/deleteSong',
      payload: id,
    });
    dispatch({ type: 'songs/fetchSongs' });
    dispatch({ type: 'songs/fetchStaticSongs' });
    dispatch({ type: 'songs/fetchStaticGenres' });
    dispatch({ type: 'songs/fetchStaticSongAlbum' });
    dispatch({ type: 'songs/fetchStaticSongAlbumArtist'});


    
  };

  const handleFilter = async () => {
    dispatch({
      type: 'songs/filterSong',
      payload: genreFilter,
    });
  };
  useEffect(() => {
    // Fetch songs from the Redux store
    dispatch({ type: 'songs/fetchSongs' });
    dispatch({ type: 'songs/fetchStaticSongs' });
    dispatch({ type: 'songs/fetchStaticGenres' });
    dispatch({ type: 'songs/fetchStaticSongAlbum' });
    dispatch({ type: 'songs/fetchStaticSongAlbumArtist'});



  }, [dispatch]);
  return (
    <Container>
      <Header>Song List</Header>
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="Filter by Genre"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        />
        <FilterButton onClick={handleFilter}>Filter</FilterButton>
      </FilterContainer>






      <StatContainer>
        <StatItem>
          <label>Total-Songs:</label>
          <span>{filteredSongsstatics?.totalSongs}</span>
        </StatItem>
        <StatItem>
          <label>Total-Artists:</label>
          <span>{filteredSongsstatics?.totalArtists}</span>
        </StatItem>
        <StatItem>
          <label>Total-Albums:</label>
          <span>{filteredSongsstatics?.totalAlbums}</span>
        </StatItem>
        <StatItem>
          <label>Total-Genres:</label>
          <span>{filteredSongsstatics?.totalGenres}</span>
        </StatItem>
      </StatContainer>

      
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Album</TableHeader>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {genreFilter
            ? filteredSongs.map((song: any) => (
                <TableRow key={song._id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>
                    <ActionButtonEdit onClick={() => setSelectedSong(song)}>Edit</ActionButtonEdit>
                    <ActionButtonDelete onClick={() => handleDeleteSong(song._id)}>Delete</ActionButtonDelete>
                  </TableCell>
                </TableRow>
              ))
            : songs.map((song: any) => (
                <TableRow key={song._id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>
                    <ActionButtonEdit onClick={() => setSelectedSong(song)}>Edit</ActionButtonEdit>
                    <ActionButtonDelete onClick={() => handleDeleteSong(song._id)}>Delete</ActionButtonDelete>
                  </TableCell>
                </TableRow>
              ))}
        </tbody>
      </Table>



   

   

      <div>
        <h2>{selectedSong ? 'Edit Song' : 'Add New Song'}</h2>
        {/* Render SongForm component for adding/updating songs */}
        <SongForm existingSong={selectedSong} />
      </div>




      <Header>Statistics</Header>



      <Table>
        <thead>
          <TableRow>
          <TableHeader>Album Name</TableHeader>

            <TableHeader>No of songs in that album</TableHeader>
     

          </TableRow>
        </thead>
        <tbody>
          {songAlbum
            && songAlbum.map((song: any,i:any) => (
                <TableRow key={i}>
                  <TableCell>{song.album}</TableCell>

                  <TableCell>{song.totalSongs}</TableCell>
          
            
                </TableRow>
              ))
     }
        </tbody>
      </Table>


      
      <Table>
        <thead>
          <TableRow>
          <TableHeader>Name of the artist</TableHeader>

            <TableHeader>No of albums the artist have</TableHeader>
            <TableHeader>No of total songs the artist have</TableHeader>

     

          </TableRow>
        </thead>
        <tbody>
          {songAlbumArtist
            && songAlbumArtist.map((song: any,i:any) => (
                <TableRow key={i}>
                  <TableCell>{song.artist}</TableCell>

                  <TableCell>{song.totalAlbums}</TableCell>
                  <TableCell>{song.totalSongs}</TableCell>

          
            
                </TableRow>
              ))
     }
        </tbody>
      </Table>


      <Table>
        <thead>
          <TableRow>
          <TableHeader>Genre</TableHeader>

            <TableHeader>No of songs in the Genre</TableHeader>
     

          </TableRow>
        </thead>
        <tbody>
          {songsGeners
            && songsGeners.map((song: any,i:any) => (
                <TableRow key={i}>
                  <TableCell>{song.genre}</TableCell>

                  <TableCell>{song.count}</TableCell>
          
            
                </TableRow>
              ))
     }
        </tbody>
      </Table>



      

    </Container>
  );
}

export default App;
