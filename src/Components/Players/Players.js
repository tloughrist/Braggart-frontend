import React, {useEffect, useState} from "react";
import './Players.css';

let displayPlayers = <p>Loading...</p>

function Players() {
    
    const [playerData, setPlayerData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        console.log(data);
        setPlayerData(data);
        setIsLoaded(true)
    };

    useEffect(() => {loadPlayerData()}, []);

    if(isLoaded) {
        displayPlayers = 
            <table>
                <tbody>
                    <tr>
                        <th>Player</th>
                        <th>Total Matches Played</th>
                        <th>Most Played Game</th>
                        <th>Most Recent Game</th>
                        <th></th>
                    </tr>
                    {playerData.map((player) => 
                        <tr key={player.name}>
                            <td>{player.name}</td>
                            <td>{player.append.total_matches}</td>
                            <td>{player.append.fav_game.map((game, index) =>
                                <span key={`${player.name}${game}`}>
                                    {(index != 0 ? ', ' : '') + game}
                                </span>
                            )}</td>
                            <td>{player.append.last_game} - {player.append.last_played}</td>
                            <td><button className={"button-element"} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

    function handleNewPlayer() {
        console.log("NewPlayer");
    };

    function handleSearch() {
        console.log("Search");
    };

    function handleEdit() {
        console.log("Edit");
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