import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { PlayerData } from './types';
import PlayerSearch from './PlayerSearcher';

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (region: string, gameName: string, tagLine: string) => {
    // Basic validation
    if (!gameName || !tagLine) {
      setError('Game name and tag line are required.');
      return;
    }

    if (!/^\d+$/.test(tagLine)) {
      setError('Tag line should be a number.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/riot/player/${region}/${gameName}/${tagLine}`);
      setPlayerData(response.data);
      
    } catch (err: any) {
      // Handle specific errors
      if (err.response) {
        setError(err.response.status === 404 ? 'Player not found. Please check the name and tag line.' : 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fade-in effect for the app when it loads
    const appElement = document.querySelector('.App');
    if (appElement) {
      appElement.classList.add('fade-in');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>League of Legends Player Searcher</h1>
        <nav className="navbar">
          <ul>
            <li><a href="#search" data-tooltip="Go to Search">Search</a></li>
            <li><a href="#info" data-tooltip="View Player Info">Player Info</a></li>
          </ul>
        </nav>
      </header>
      <main id="search">
        <PlayerSearch onSearch={handleSearch} playerData={playerData} error={error} isLoading={isLoading}/>
      </main>
      <footer className="footer">
        <p>&copy; 2024 League of Legends Player Searcher</p>
        <a href="https://www.riotgames.com/en" target="_blank" rel="noopener noreferrer">Riot Games</a>
      </footer>
    </div>
  );
}

export default App;
