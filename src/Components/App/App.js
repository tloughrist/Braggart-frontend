import React, { useState, useEffect } from "react";
import { Route, Routes, useHistory } from "react-router-dom";
import './App.css';
import Banner from "../Banner/Banner.js";
import Games from "../Games/Games.js";
import Matches from "../Matches/Matches.js";
import Players from "../Players/Players.js";
import StatBoard from "../StatBoard/StatBoard.js";

function App() {

  const [playerData, setPlayerData] = useState();
  const [gameData, setGameData] = useState();
  const [matchData, setMatchData] = useState();

  return (
    <div>
      <Banner/>
      <Routes>
        <Route path="games" element={<Games
          playerData={playerData}
          gameData={gameData}
          matchData={matchData}
        />}>
        </Route>
        <Route path="matches" element={<Matches
            playerData={playerData}
            gameData={gameData}
            matchData={matchData}
          />}>
        </Route>
        <Route path="statboard" element={<StatBoard
            playerData={playerData}
            gameData={gameData}
            matchData={matchData}
          />}>
        </Route>
        <Route path="/players" element={<Players
            playerData={playerData}
            gameData={gameData}
            matchData={matchData}
          />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;