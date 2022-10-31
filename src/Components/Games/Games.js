import React, {useEffect, useState} from "react";
import './Games.css';

function Games({ playerData, gameData, matchData, setGameData }) {

    const [isLoaded, setIsLoaded] = useState(false);

    async function loadGameData() {
        const response = await fetch("http://localhost:9292/games");
        const data = await response.json();
        console.log(data);
        setGameData(data);
        return setIsLoaded(true)
    };

    useEffect(() => {loadGameData()}, []);

    //I need to build a table using this data
    const displayGames = isLoaded ? gameData.map((game) => <p>{game.name}</p>) : <p>Loading...</p>;

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
                {displayGames}
            </div>
        </div>
    );
};

export default Games;