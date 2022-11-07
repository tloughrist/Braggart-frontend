import React, {useEffect, useState} from "react";
import './Players.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {readPlayers, createPlayer, deletePlayer, updatePlayer} from './PlayerCRUD.js';

let displayPlayers = <p>Loading...</p>;

function Players({ playerData, setPlayerData }) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState();
    const [editPlayerName, setEditPlayerName] = useState();
    const [editPlayerId, setEditPlayerId] = useState();

    useEffect(() => {
        async function initialLoad(){
            const players = await readPlayers();
            await setPlayerData(players);
            setIsLoaded(true);
        }
        initialLoad();   
    }, []);

    function handleNameChange(name, id){
        setEditPlayerName(name);
        setEditPlayerId(id);
    };

    async function handleEditSubmit(e){
        e.preventDefault();
        await updatePlayer(editPlayerId, editPlayerName);
        const players = await readPlayers();
        setPlayerData(players);
    };

    async function handleDelete(playerId) {
        await deletePlayer(playerId);
        const players = await readPlayers();
        setPlayerData(players);
    };

    async function handlePlayerSubmit(e) {
        e.preventDefault();
        if(newPlayerName) {
            await createPlayer(newPlayerName);
            const players = await readPlayers();
            setPlayerData(players);
        } else {
            alert("Please enter player name");
        }
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
                                    trigger={<button className={"button-element"}>Edit</button>}
                                    position="bottom right"
                                >
                                    <form onSubmit={handleEditSubmit}>
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
            <div className={"button-container"}>
                <Popup
                    key={`newplayerpopup`}
                    trigger={<button className={"button-element"}>Create New Player</button>}
                    position="bottom right"
                >
                    <form  onSubmit={handlePlayerSubmit}>
                        <input
                            type="text"
                            placeholder="New Player Name"
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            id="new-player-input"
                        ></input>
                        <input type="submit" className={"button-element"} value="Add New Player"></input>
                    </form>
                </Popup>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"player-container"}>
                {displayPlayers}
            </div>
        </div>
    );
};

export default Players;