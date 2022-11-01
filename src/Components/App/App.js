import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Banner from "../Banner/Banner.js";
import Games from "../Games/Games.js";
import Matches from "../Matches/Matches.js";
import Players from "../Players/Players.js";
import StatBoard from "../StatBoard/StatBoard.js";

function App() {

  return (
    <div>
      <Banner/>
      <Routes>
        <Route path="games" element={<Games />}>
        </Route>
        <Route path="matches" element={<Matches />}>
        </Route>
        <Route path="statboard" element={<StatBoard />}>
        </Route>
        <Route path="/players" element={<Players />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;