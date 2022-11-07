import React, {useEffect, useState} from "react";
import './Players.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

let displayPlayers = <p>Loading...</p>;

function Players({ playerData, setPlayerData }) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState();
    const [editPlayerName, setEditPlayerName] = useState();
    const [editPlayerId, setEditPlayerId] = useState();

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        //console.log(data);
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
        //console.log(data);
    };

    async function updatePlayer(id, name) {
        const response = await fetch(`http://localhost:9292/players/${id}`, {
            method: "PATCH",
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

    async function deletePlayer(id) {
        const response = await fetch(`http://localhost:9292/players/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        //console.log(data);
    };

    useEffect(() => {loadPlayerData()}, []);

    function handleNameChange(name, id){
        setEditPlayerName(name);
        setEditPlayerId(id);
    };

    async function handleEditSubmit(e){
        e.preventDefault();
        await updatePlayer(editPlayerId, editPlayerName);
        loadPlayerData();
    };

    async function handleDelete(playerId) {
        await deletePlayer(playerId);
        loadPlayerData();
    };

    function handlePlayerSubmit(e) {
        e.preventDefault();
        createNewPlayer(newPlayerName);
        loadPlayerData();
    };

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
                            <td>
                                <Popup
                                    key={`${player.id}popup`}
                                    trigger={<button>Edit</button>}
                                    position="bottom right"
                                >
                                    <form onSubmit={(e) => handleEditSubmit(e)}>
                                        <input
                                            type="text"
                                            placeholder={player.name}
                                            onChange={(e) => handleNameChange(e.target.value, player.id)}
                                        ></input>
                                        <input type="submit" className={"button-element"} value="Submit Edit"></input>
                                    </form>
                                </Popup>
                            </td>
                            <td><button className={"button-element"} onClick={() => handleDelete(player.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

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