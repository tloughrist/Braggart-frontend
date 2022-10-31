import React, {useEffect, useState} from "react";
import './Players.css';

function Players({ playerData, gameData, matchData, setPlayerData }) {
    
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        console.log(data);
        setPlayerData(data);
        setIsLoaded(true)
    };

    useEffect(() => {loadPlayerData()}, []);

    //I need to build a table using this data
    const displayPlayers = isLoaded ? playerData.map((player) => <p>{player.name}</p>) : <p>Loading...</p>;

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
                {displayPlayers}
            </div>
        </div>
    );
};

export default Players;