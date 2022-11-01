import React, {useEffect, useState} from "react";
import './Players.css';

let displayPlayers = <p>Loading...</p>

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

    if(isLoaded) {
        displayPlayers = 
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Total Matches Played</th>
                        <th>Favorite Game</th>
                        <th>Most Recent Game</th>
                    </tr>
                    {playerData.map((player) => 
                        <tr>
                            <td>{player.name}</td>
                            <td>{player.append.total_matches}</td>
                            <td>{player.append.fav_game[0]}</td>
                            <td>{player.append.last_game} - {player.append.last_played}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
    }

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