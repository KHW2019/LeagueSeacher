import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { PlayerData } from './types';
import PlayerSearch from './PlayerSearch';

const ERROR_MESSAGES = {
  missingFields: 'Game name and tag line are required.',
  invalidTagLine: 'Tag line should be a number.',
  playerNotFound: 'Player not found. Please check the name and tag line.',
  genericError: 'An unexpected error occurred. Please try again later.',
};

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async (region: string, gameName: string, tagLine: string) => {
    // Basic validation
    if (!gameName || !tagLine) {
      setError(ERROR_MESSAGES.missingFields);
      return null;
    }

    if (!/^\d+$/.test(tagLine)) {
      setError(ERROR_MESSAGES.invalidTagLine);
      return null;
    }

    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/riot/player/${region}/${gameName}/${tagLine}`);
      if (response.status === 200) {
        setPlayerData(response.data);
        return { gameName, tagLine };
      }
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.status === 404
            ? ERROR_MESSAGES.playerNotFound
            : ERROR_MESSAGES.genericError
        );
      } else {
        setError(ERROR_MESSAGES.genericError);
      }
    } finally {
      setIsLoading(false);
    }

    return null;
  }, []);

  useEffect(() => {
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
        <PlayerSearch onSearch={handleSearch} playerData={playerData} error={error} isLoading={isLoading} />
      </main>
      <footer className="footer">
        <p>&copy; 2024 League of Legends Player Searcher</p>
        <a href="https://www.riotgames.com/en" target="_blank" rel="noopener noreferrer">Riot Games</a>
      </footer>
    </div>
  );
}

export default App;
