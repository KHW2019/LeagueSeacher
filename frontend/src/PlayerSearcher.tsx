import React, { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(region, gameName, tagLine);
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
        <input
          type="text"
          placeholder="Enter Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Tagline"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
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
