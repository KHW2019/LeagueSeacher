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

## Project Description

The League of Legends Player Searcher is a web application that allows users to search for League of Legends players using their Riot ID and tagline. It integrates with Riot Games' API to fetch and display player information. Built with a React frontend and an Express backend, this full-stack application provides a seamless user experience and efficient data handling.

## Features

- **Search Functionality:** Users can search for League of Legends players by entering their Riot ID and tagline.
- **API Integration:** Fetches player data from the Riot Games API and displays it in the application.
- **Error Handling:** Provides user-friendly error messages for invalid inputs or API request failures.
- **Responsive Design:** Adapts to various screen sizes for a consistent user experience across devices.
- **Persistent Search History:** Stores and displays recent searches for quick access.

## Installation

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.
- A Riot API key.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/league-searcher.git
   cd league-searcher
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up the Backend:**

   Navigate to the backend directory (assuming your backend is in a separate directory):

   ```bash
   cd backend
   ```

   Install backend dependencies:

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the backend directory and add your Riot API key:

   ```env
   RIOT_API_KEY=your-api-key-here
   PORT=5000
   ```

5. **Start the Development Servers:**

   For the backend:

   ```bash
   npm run dev
   ```

   For the frontend (in the root directory):

   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and go to [http://localhost:5173](http://localhost:5173).
2. Enter the player's Riot ID and tagline into the input fields.
3. Click the "Search" button to retrieve and display the player's profile information.
4. View recent search history and access previous searches easily.

## Technologies Used

**Frontend:**

- React
- TypeScript
- Axios
- Vite (for development and build)

**Backend:**

- Express
- TypeScript
- Axios
- dotenv
- CORS (for cross-origin requests)

**Tools:**

- Node.js
- npm or yarn (for package management)

## API Documentation

This project uses Riot Games' API to fetch player data. To access this API, you need to sign up for a developer key from Riot Games [here](https://developer.riotgames.com/).

### Example API Call

The backend API endpoint that the frontend communicates with is:

**GET** `/api/riot/player/:gameName/:tagLine`

This endpoint fetches player data from Riot Games using the player's `gameName` and `tagLine`.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and create a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request.

---

This updated README now reflects the additional features and recent changes made to the project. It provides clear instructions and detailed information to help users and contributors understand and work with the application effectively.
