import React from "react";
import './Players.css';

function Players({ playerData, gameData, matchData, setPlayerData }) {
    
    function handleNewPlayer() {
        console.log("NewPlayer");
    };

    function handleSearch() {
        console.log("Search");
    };

    return (
        <div className="players">
            <div className={"button-container"}>
                <input className={"search-element"} name="search" type="text" placeholder="Search players..."></input>
                <input className={"button-element"} type="submit" onClick={handleSearch}></input>
                <button className={"button-element"} onClick={handleNewPlayer}>Add New Player</button>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"player-container"}>
                <p>Content</p>
            </div>
        </div>
    );
};

export default Players;