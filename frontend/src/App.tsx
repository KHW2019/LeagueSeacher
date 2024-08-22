import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { PlayerData } from './types'
import PlayerSearch from './PlayerSearcher'

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async(gameName: string, tagLine: string) => {
    if(!gameName || !tagLine){
      setError('Game name or tage Line are required.');
      return;
    }

    if(!/^\d+$/.test(tagLine)){
      setError('Tag line should be a number.');
      return;
    }

    try{
      const response = await axios.get(`http://localhost:5000/api/riot/player/${gameName}/${tagLine}`
      );
      setPlayerData(response.data);
      setError(null)
    }catch(err : any){
      // Handle case where error.message might not be available
      setError(err?.response?.data?.message || 'An error occured. Please try agian.');
      setPlayerData(null);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>League of Legands player Searcher</h1>
      </header>
      <PlayerSearch onSearch={handleSearch} playerData={playerData} error={error}/>
    </div>
  );
}

export default App
