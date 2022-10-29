import React from "react";
import './Games.css';

function Games({ playerData, gameData, matchData, setGameData }) {

    function handleNewGame() {
        console.log("NewGame");
    };

    function handleSearch() {
        console.log("Search");
    };

    return (
        <div className="games">
            <div className={"button-container"}>
                <input className={"search-element"} name="search" type="text" placeholder="Search games..."></input>
                <input className={"button-element"} type="submit" onClick={handleSearch}></input>
                <button className={"button-element"} onClick={handleNewGame}>Add New Game</button>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"game-container"}>
                <p>Content</p>
            </div>
        </div>
    );
};

export default Games;