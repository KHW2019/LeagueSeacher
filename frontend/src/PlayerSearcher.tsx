import React, { useState } from 'react';

interface PlayerSearchProps {
  onSearch: (gameName: string, tagLine: string) => void;
  playerData: any;
  error: string | null;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSearch, playerData, error }) => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(gameName, tagLine);
  };

  return (
    <div className="player-searcher">
      <h2>Search for a Player</h2>
      <form className="input-group" onSubmit={handleSubmit}>
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
