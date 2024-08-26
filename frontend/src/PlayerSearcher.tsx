import React, { useEffect, useState } from 'react';

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
  const [filteredHistory, setFilteredHistory] = useState<{gameName: string,tagLine: string}[]>([]);

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
    setGameName(e.target.value);

    //Filter history based on input
    if(e.target.value)
    {
      const filtered = searchHistory.filter(entry => 
        entry.gameName.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setFilteredHistory(filtered);
    }else{
      setFilteredHistory([]);
    }
  };

const handleTagLineChange = (e:React.ChangeEvent<HTMLInputElement>) =>  {
    setTagLine(e.target.value);
  };

  const handleSuggestionClick = (gameName: string, tagLine: string) =>{
    setGameName(gameName);
    setTagLine(tagLine);
    setFilteredHistory([]);
  }

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
        <input
          type="text"
          placeholder="Enter Game Name"
          value={gameName}
          onChange={handleGameNameChange}
        />
        <input
          type="text"
          placeholder="Enter Tagline"
          value={tagLine}
          onChange={handleTagLineChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* Suggestions dropdown */}
      {filteredHistory.length > 0 && (
        <ul className="suggestions-list">
          {filteredHistory.map((entry, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(entry.gameName, entry.tagLine)}
            >
              {entry.gameName}#{entry.tagLine}
            </li>
          ))}
        </ul>
      )}

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
