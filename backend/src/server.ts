import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Restrict to frontend's URL
  credentials: true, // Allow credentials if necessary
}));

app.use(express.json());

const apiKey = process.env.RIOT_API_KEY as string;
if(!apiKey){
  throw new Error('Riot_API_KEY is not defined in environment variables')
}

app.get('/api/riot/player/:region/:gameName/:tagLine', async (req: Request, res : Response) => {
  const { region, gameName, tagLine } = req.params;
  const apiURL = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  
  try {
    const response = await axios.get(apiURL, {
      headers: { 'X-Riot-Token': apiKey }
    });
    res.json(response.data);
  } catch (error : any) {
    if(error.response){
      //response with status code
      res.status(error.response.status).json({ message : error.response.data});
    }else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ message: 'No response from the server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ message: 'Error setting up the request' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
