import React, {useEffect, useState} from "react";
import './Matches.css';

let displayMatches = <p>Loading...</p>
let displayPlayerCheckBoxes = <p>Loading...</p>
let displayGames = <p>Loading...</p>

function Matches({ playerData, gameData, setPlayerData, setGameData }) {
    
    const [matchData, setMatchData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [matchPlayers, setMatchPlayers] = useState([]);
    const [matchDate, setMatchDate] = useState();
    const [matchGame, setMatchGame] = useState();

    async function loadMatchData() {
        const response = await fetch("http://localhost:9292/matches");
        const data = await response.json();
        console.log(data);
        setMatchData(data);
    };

    async function loadGameData() {
        const response = await fetch("http://localhost:9292/games");
        const data = await response.json();
        console.log(data);
        setGameData(data);
    };

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        console.log(data);
        setPlayerData(data);
    };

    useEffect(() =>
        {async function initialLoad(){
            await loadMatchData();
            await loadGameData();
            await loadPlayerData();
            setIsLoaded(true);
        };
        initialLoad();
    }, []);

    if(isLoaded) {
        displayMatches = 
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Game</th>
                        <th>Players</th>
                        <th>Winner</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {matchData.map((match) =>
                        <tr key={`${match.id}${match.date}`}>
                            <td>{match.match_date}</td>
                            <td>{match.append.game}</td>
                            <td>{match.append.players.map((player, index) =>
                                <span key={`${match.id}${player}`}>
                                    {(index != 0 ? ', ' : '') + player}
                                </span>
                            )}</td>
                            <td>{match.append.winner}</td>
                            <td><button className={"button-element"} onClick={handleEdit}>Edit</button></td>
                            <td><button className={"button-element"} onClick={handleDelete}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

    if(isLoaded) {
        displayPlayerCheckBoxes = 
            <div>
                {playerData.map((player) =>
                    <>
                        <input
                            type="checkbox"
                            value={player.id}
                            name={player.name}
                            onChange={(e) => {
                                if(e.target.checked){
                                    const sansPlayers = matchPlayers.filter((id) => id === e.target.value);
                                    setMatchPlayers([...sansPlayers]);
                                } else {
                                    setMatchPlayers([...matchPlayers, e.target.value]);
                                }
                            }}
                            >                  
                        </input>
                        <label htmlFor={player.name}>{player.name}</label>
                        <input
                            type="text"
                            name={`${player.name}points`
                            onChange}>
                        </input>                    </>
                )}   
            </div>
    }

    if(isLoaded) {
        displayGames = 
            <select onChange={(e) => setMatchGame(e.target.value)}>
                {gameData.map((game) =>
                    <option value={game.id}>{game.name}</option>
                )}   
            </select>
    }
    
    function handleMatchSubmit() {
        console.log("NewMatch");
    };
    
    function handleDelete() {
        console.log("Search");
    };

    function handleEdit() {
        console.log("Edit");
    };
    
    return (
        <div className="matches">
            <form className={"button-container"} onSubmit={handleMatchSubmit}>
                <input type="date" onChange={(e) => setMatchDate(e.target.value)}></input>
                {displayPlayerCheckBoxes}
                {displayGames}
                <input type="submit" className={"button-element"} value="Add New Match"></input>
            </form>
            <hr id="hr-divider"></hr>
            <div className={"match-container"}>
                {displayMatches}
            </div>
        </div>
    );
};

export default Matches;