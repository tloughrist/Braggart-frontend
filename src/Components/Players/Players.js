import React, {useEffect, useState} from "react";
import './Players.css';

let displayPlayers = <p>Loading...</p>;

function Players({ playerData, setPlayerData }) {
    
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState();

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        console.log(data);
        setPlayerData(data);
        setIsLoaded(true)
    };

    async function createNewPlayer(name) {
        const response = await fetch("http://localhost:9292/players", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        });
        const data = await response.json();
        console.log(data);
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
                            <td><button className={"button-element"} onClick={handleDelete}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

    function handleEdit() {
        console.log("Edit");
    };

    function handleDelete() {
        console.log("Del");
    };

    function handlePlayerSubmit(e) {
        e.preventDefault();
        createNewPlayer(newPlayerName);
        loadPlayerData();
    };

    return (
        <div className="players">
            <form className={"button-container"} onSubmit={handlePlayerSubmit}>
                <input type="text" placeholder="New Player Name" onChange={(e) => setNewPlayerName(e.target.value)}></input>
                <input type="submit" className={"button-element"} value="Add New Player"></input>
            </form>
            <hr id="hr-divider"></hr>
            <div className={"player-container"}>
                {displayPlayers}
            </div>
        </div>
    );
};

export default Players;