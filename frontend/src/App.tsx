import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { PlayerData } from './types';
import PlayerSearch from './PlayerSearcher';

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (gameName: string, tagLine: string) => {
    // Basic validation
    if (!gameName || !tagLine) {
      setError('Game name and tag line are required.');
      return;
    }

    if (!/^\d+$/.test(tagLine)) {
      setError('Tag line should be a number.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/riot/player/${gameName}/${tagLine}`);
      setPlayerData(response.data);
      setError(null); // Clear previous errors
    } catch (err: any) {
      // Handle specific errors
      if (err.response) {
        setError(err.response.status === 404 ? 'Player not found. Please check the name and tag line.' : 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setPlayerData(null); // Clear player data on error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>League of Legends Player Searcher</h1>
      </header>
      <PlayerSearch onSearch={handleSearch} playerData={playerData} error={error} />
    </div>
  );
}

export default App;

