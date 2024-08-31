# League of Legends Player Searcher

A web application that allows users to search for League of Legends players by their Riot ID and tagline.

## Table of Contents
- [Project Description](#project-description)
- Blah I Want this.
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- Blah I don't want this

## Project Description
The League of Legends Player Searcher is a simple web application that leverages Riot Games' API to retrieve and display information about players based on their Riot ID and tagline. This application is built with a React frontend and an Express backend, providing a full-stack environment to interact with external APIs.

## Features
- **Search Functionality**: Users can search for League of Legends players using their Riot ID and tagline.
- **API Integration**: Fetches player data from the Riot Games API.
- **Error Handling**: Displays appropriate error messages for invalid inputs or API request failures.

## Installation
### Prerequisites
- Node.js and npm (or yarn) installed on your machine.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/league-searcher.git
   cd league-searcher
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Set up the backend**:
   - Navigate to the backend directory (assuming your backend is in a separate directory):
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm install
     ```

4. **Configure environment variables**:
   - Create a `.env` file in the backend directory and add your Riot API key:
     ```env
     RIOT_API_KEY=your-api-key-here
     PORT=5000
     ```

5. **Start the development servers**:
   - For the backend:
     ```bash
     npm run dev
     ```
   - For the frontend (in the root directory):
     ```bash
     npm run dev
     ```

## Usage
1. Open your browser and go to `http://localhost:5173`.
2. Enter the player's Riot ID and tagline.
3. Click on the "Search" button to retrieve and display the player's profile information.

## Technologies Used
- **Frontend**:
  - React
  - TypeScript
  - Axios

- **Backend**:
  - Express
  - TypeScript
  - Axios
  - dotenv

- **Tools**:
  - Vite (for the frontend)
  - Node.js
  - CORS (for cross-origin requests)

## API Documentation
This project uses Riot Games' API to fetch player data. To access this API, you need to sign up for a developer key from Riot Games [here](https://developer.riotgames.com/).

### Example API Call
The backend API endpoint that the frontend communicates with is:
```http
GET /api/riot/player/:gameName/:tagLine
```
This endpoint fetches player data from Riot Games using the player's `gameName` and `tagLine`.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and create a pull request.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch with your feature/bugfix.
3. Make your changes.
4. Submit a pull request.
