import React, { useEffect, useState, useCallback } from 'react';
import './PlayerSearch.css';
import { PlayerData } from '../PlayerData/types';

interface PlayerSearchProps {
  onSearch: (region: string, gameName: string, tagLine: string) => Promise<{ gameName: string, tagLine: string } | null>;
  playerData: PlayerData | null;
  error: string | null;
  isLoading: boolean;
}

// interface PlayerData {
//   gameName: string;
//   tagLine: string;
//   puuid: string;
// }

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSearch, playerData, error, isLoading }) => {
  const [region, setRegion] = useState('europe');
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [searchHistory, setSearchHistory] = useState<{ gameName: string, tagLine: string }[]>([]);
  const [filteredGameNames, setFilteredGameNames] = useState<string[]>([]);
  const [filteredTagLines, setFilteredTagLines] = useState<string[]>([]);

  const maxHistorySize = 10;

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await onSearch(region, gameName, tagLine);

    if (result) {
      const newEntry = { gameName: result.gameName, tagLine: result.tagLine };
      const updateHistory = [newEntry, ...searchHistory].slice(0, maxHistorySize);
      setSearchHistory(updateHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updateHistory));
    }
  };

  const handleGameNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setGameName(inputValue);

    if (inputValue) {
      const filtered = searchHistory
        .map(entry => entry.gameName)
        .filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase()));
      setFilteredGameNames(Array.from(new Set(filtered)));
    } else {
      setFilteredGameNames([]);
    }
  }, [searchHistory]);

  const handleTagLineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTagLine(inputValue);

    if (inputValue) {
      const filtered = searchHistory
        .filter(entry => entry.gameName === gameName)
        .map(entry => entry.tagLine)
        .filter(tag => tag.startsWith(inputValue));
      setFilteredTagLines(Array.from(new Set(filtered)));
    } else {
      setFilteredTagLines([]);
    }
  }, [searchHistory, gameName]);

  const handleGameNameClick = (name: string) => {
    setGameName(name);
    setFilteredGameNames([]);
  };

  const handleTagLineClick = (tag: string) => {
    setTagLine(tag);
    setFilteredTagLines([]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="player-searcher">
      <h2>Search for a Player</h2>
      <form className="input-group" onSubmit={handleSubmit}>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="region-select"
        >
          <option value="americas">Americas</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="sea">SEA</option>
        </select>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Game Name"
            value={gameName}
            onChange={handleGameNameChange}
            className="player-name-input"
          />
          {filteredGameNames.length > 0 && (
            <ul className="suggestions-list">
              {filteredGameNames.map((name, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleGameNameClick(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Tagline"
            value={tagLine}
            onChange={handleTagLineChange}
            className="player-name-input"
          />
          {filteredTagLines.length > 0 && (
            <ul className="suggestions-list">
              {filteredTagLines.map((tag, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleTagLineClick(tag)}
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Search</button>
      </form>

      <button onClick={clearHistory} className="clear-history-button">Clear History</button>

      {isLoading && <div className="loading_icon">Loading...</div>}

      {error && <p className="error">{error}</p>}
      {playerData && (
        <div className="player-info">
          <h2>{playerData.gameName}</h2>
          <p>Tagline: {playerData.tagLine}</p>
          <p>PUUID:</p>
          <pre>{playerData.puuid}</pre>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
