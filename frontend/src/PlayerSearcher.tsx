import React, { useState } from 'react';
import { PlayerData } from './types';

interface PlayerSearcherProps{
    onSearch: (gameName: string, tagLine: string ) => void;
    playerData: PlayerData | null;
    error: string | null;
}

function PlayerSearcher({onSearch, playerData, error} : PlayerSearcherProps){
    const [gameName, setGameName] = useState<string>('');
    const [tagLine, setTagLine] = useState<string>('');

    const handleSearchClick = async () => {
        onSearch(gameName, tagLine);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tag Line"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
            />
            <button onClick={handleSearchClick}>Search</button>

            {error && <div className='error'>{error}</div>}

            {playerData && (
                <div className="player-info">
                    <h2>Player Found</h2>
                    <p><strong>PUUID:</strong> {playerData.puuid}</p>
                    <p><strong>Game Name:</strong> {playerData.gameName}</p>
                    <p><strong>Tag Line:</strong> {playerData.tagLine}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerSearcher;
