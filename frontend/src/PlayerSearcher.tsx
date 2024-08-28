import React, { useEffect, useState } from 'react';
import './PlayerSearch.css';

interface PlayerSearchProps {
  onSearch: (region: string, gameName: string, tagLine: string) => void;
  playerData: any;
  error: string | null;
  isLoading: boolean;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSearch, playerData, error, isLoading }) => {
  const [region, setRegion] = useState('europe');
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [searchHistory, setSearchHistory] = useState<{gameName: string, tagLine: string}[]>([]);
  const [filteredGameNames, setFilteredGameNames] = useState<string[]>([]);
  const [filteredTagLines, setFilteredTagLines] = useState<string[]>([]);

  const maxHistorySize = 10;

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if(storedHistory){
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(region, gameName, tagLine);

    //save to serach History
    const newEntry = {gameName, tagLine};

    //update history and limit the number of entires 
    const updateHistory = [newEntry, ...searchHistory].slice(0, maxHistorySize);
    setSearchHistory(updateHistory);

    localStorage.setItem('serachHistroy', JSON.stringify(updateHistory));
  };

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const inputValue = e.target.value;
    setGameName(inputValue);

    //Filter history based on input
    if(inputValue)
    {
      const filtered = searchHistory
        .map(entry => entry.gameName)
        .filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase()));
      setFilteredGameNames(Array.from(new Set(filtered)));
    }else{
      setFilteredGameNames([]);
    }
  };

const handleTagLineChange = (e:React.ChangeEvent<HTMLInputElement>) =>  {
    const inputValue = e.target.value
    setTagLine(inputValue);

    if(inputValue){
      const filtered = searchHistory
        .filter(entry => entry.gameName === gameName)
        .map(entry => entry.tagLine)
        .filter(tag => tag.startsWith(inputValue));
        setFilteredTagLines(Array.from(new Set(filtered)));
    }else{
      setFilteredTagLines([]);
    }
  };

  const handleGameNameClick = (name: string) => {
    setGameName(name);
    setFilteredGameNames([]);
  };

  const handleTagLineClick = (tag: string) => {
    setTagLine(tag);
    setFilteredTagLines([]);
  };

  return (
    <div className="player-searcher">
      <h2>Search for a Player</h2>
      <form className="input-group" onSubmit={handleSubmit}>
        <select
          value={region}
          onChange={(e)=> setRegion(e.target.value)}
          className="region-select"
        >
          <option value="americas">Americans</option>
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
            
          />
          {/* name suggestion dropdown */}
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
          />
          {/* tagline suggestion dropdown */}
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

      {/* display loading icon when searching*/}
      {isLoading && <div className="loading_icon">loading...</div>}

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
