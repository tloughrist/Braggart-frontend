import React, {useEffect, useState} from "react";
import './Games.css';

let displayGames = <p>Loading...</p>

function Games({ playerData, gameData, setGameData }) {

    const [isLoaded, setIsLoaded] = useState(false);

    async function loadGameData() {
        const response = await fetch("http://localhost:9292/games");
        const data = await response.json();
        //console.log(data);
        setGameData(data);
        return setIsLoaded(true)
    };

    useEffect(() => {loadGameData()}, []);

    if(isLoaded) {
        displayGames = 
            <table>
                <tbody>
                    <tr>
                        <th>Game</th>
                        <th>No. of Matches</th>
                        <th>Last Match</th>
                        <th>Most Winning Player</th>
                        <th></th>
                        <th></th>
                     </tr>
                    {gameData.map((game) =>
                        <tr key={game.name}>
                            <td>{game.name}</td>
                            <td>{game.append.no_of_matches}</td>
                            <td>{game.append.last_match}</td>
                            <td>{game.append.most_wins.map((winner, index) =>
                                <span key={`${winner}`}>
                                    {(index != 0 ? ', ' : '') + winner}
                                </span>
                            )}</td>
                            <td><button className={"button-element"} onClick={handleEdit}>Edit</button></td>
                            <td><button className={"button-element"} onClick={handleEdit}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

    function handleNewGame() {
        console.log("NewGame");
    };

    function handleSearch() {
        console.log("Search");
    };

    function handleEdit() {
        console.log("Edit");
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