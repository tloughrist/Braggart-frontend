import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Banner from "../Banner/Banner.js";
import Games from "../Games/Games.js";
import Matches from "../Matches/Matches.js";
import Players from "../Players/Players.js";
import StatBoard from "../StatBoard/StatBoard.js";

function App() {

  const [playerData, setPlayerData] = useState();
  const [gameData, setGameData] = useState();

  return (
    <div>
      <Banner/>
      <Routes>
        <Route path="games" element={<Games playerData={playerData} setPlayerData={setPlayerData} gameData={gameData} setGameData={setGameData} />}>
        </Route>
        <Route path="matches" element={<Matches playerData={playerData}  setPlayerData={setPlayerData} gameData={gameData} setGameData={setGameData} />}>
        </Route>
        <Route path="statboard" element={<StatBoard playerData={playerData} />}>
        </Route>
        <Route path="/players" element={<Players playerData={playerData} setPlayerData={setPlayerData} />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;