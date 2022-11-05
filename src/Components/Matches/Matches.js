import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Matches.css';

let displayMatches = <p>Loading...</p>;
let displayPlayerCheckBoxes = <p>Loading...</p>;
let displayGames = <p>Loading...</p>;

function Matches({ playerData, gameData, setPlayerData, setGameData }) {
    
    const [matchData, setMatchData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [matchPlayers, setMatchPlayers] = useState({});
    const [matchDate, setMatchDate] = useState();
    const [matchGame, setMatchGame] = useState();
    const [editMatchDate, setEditMatchDate] = useState();
    const [editmatchPlayers, setEditMatchPlayers] = useState({});
    const [editMatchGame, setEditMatchGame] = useState();

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

    async function createMatch(matchDate, matchGame) {
        const response = await fetch("http://localhost:9292/matches", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                match_date: matchDate,
                game_id: matchGame
            })
        });
        const data = await response.json();
        console.log(data);
        return data.id;
    };

    async function createPlayerMatch(playerId, points, matchId) {
        const response = await fetch("http://localhost:9292/player_matches", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                player_id: playerId,
                points: points,
                match_id: matchId
            })
        });
        const data = await response.json();
        console.log(data);
        return data.id;
    };

    async function deleteMatch(matchId) {
        const response = await fetch(`http://localhost:9292/matches/${matchId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);
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
                    {matchData.map((match) => {
                        const playerPoints = Object.entries(match.append.players);
                        const playerPointsArr = [];
                        for (const [key, value] of playerPoints) {
                            playerPointsArr.push(`${key}(${value})`);
                        };
                        return (
                        <>
                            <tr key={`${match.id}${match.date}`}>
                                <td>{match.match_date}</td>
                                <td>{match.append.game}</td>
                                <td>{playerPointsArr.map((entry, index) =>
                                    <span key={`${match.id}${entry}`}>
                                        {(index != 0 ? ', ' : '') + entry}
                                    </span>
                                )}</td>
                                <td>{match.append.winner}</td>
                                <td><Popup trigger={<button>Edit</button>} position="bottom right">
                                    <form>
                                        <input type="date" onChange={(e) => setEditMatchDate(e.target.value)}></input>
                                        <select onChange={(e) => setEditMatchGame(e.target.value)}>
                                            {gameData.map((game) => 
                                                <option value={game.id}>{game.name}</option>
                                            )}
                                        </select>
                                        
                                        <input type="submit" className={"button-element"} value="Submit Edit"></input>
                                    </form>
                                </Popup></td>
                                <td><button className={"button-element"} value={match.id} onClick={handleDelete}>Delete</button></td>
                            </tr>
                        </>
                    )})}
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
                                const player_id = e.target.value;
                                if(e.target.checked){
                                    const keyArray = matchPlayers.keys;
                                    const matchPlayersHold = matchPlayers;
                                    if(keyArray > 0 && keyArray.includes(player_id)){
                                        setMatchPlayers({...matchPlayersHold});
                                    } else {
                                        matchPlayersHold[player_id] = 0;
                                        setMatchPlayers({...matchPlayersHold});
                                    }
                                } else {
                                    const sansMatchPlayers = matchPlayers;
                                    delete sansMatchPlayers[player_id];
                                    setMatchPlayers({...sansMatchPlayers});
                                }
                            }}
                            >                  
                        </input>
                        <label htmlFor={player.name}>{player.name}</label>
                        <input
                            type="text"
                            name={`${player.name}points`}
                            onChange={(e) => {
                                const newMatchPlayers = matchPlayers;
                                newMatchPlayers[player.id] = e.target.value;
                                setMatchPlayers({...newMatchPlayers})
                            }}>
                        </input>
                        <label htmlFor={`${player.name}points`}>points</label>
                    </>
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
    
    async function handleMatchSubmit(e) {
        e.preventDefault();
        const matchId = await createMatch(matchDate, matchGame);
        for (const player in matchPlayers) {
            await createPlayerMatch(player, matchPlayers[player], matchId);
        };
        await loadMatchData();
    };
    
    async function handleDelete(e) {
        const matchId = e.target.value;
        await deleteMatch(matchId);
        await loadMatchData();
        await loadPlayerData();
    };

    async function handleEdit(match) {
        
 
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