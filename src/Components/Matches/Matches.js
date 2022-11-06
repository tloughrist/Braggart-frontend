import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Matches.css';
import DisplayMatches from './DisplayMatches.js';
import DisplayPlayerCheckBoxes from './DisplayPlayerCheckBoxes.js'

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
    const [editMatchPlayers, setEditMatchPlayers] = useState({});
    const [editMatchGame, setEditMatchGame] = useState();

    async function loadMatchData() {
        const response = await fetch("http://localhost:9292/matches");
        const data = await response.json();
        //console.log(data);
        setMatchData(data);
    };

    async function loadGameData() {
        const response = await fetch("http://localhost:9292/games");
        const data = await response.json();
        //console.log(data);
        setGameData(data);
    };

    async function loadPlayerData() {
        const response = await fetch("http://localhost:9292/players");
        const data = await response.json();
        //console.log(data);
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
        //console.log(data);
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
        //console.log(data);
        return data.id;
    };

    async function deleteMatch(matchId) {
        const response = await fetch(`http://localhost:9292/matches/${matchId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        //console.log(data);
    };

    async function updateMatch(matchId, matchObj) {
        const response = await fetch(`http://localhost:9292/matches/${matchId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                match_date: matchObj.match_date,
                game_id: matchObj.game_id
            })
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
                            <DisplayMatches
                                match={match}
                                playerData={playerData}
                                playerPointsArr={playerPointsArr}
                                editMatchDate={editMatchDate}
                                editMatchGame={editMatchGame}
                                editMatchPlayers={editMatchPlayers}
                                setEditMatchDate={setEditMatchDate}
                                setEditMatchGame={setEditMatchGame}
                                setEditMatchPlayers={setEditMatchPlayers}
                                gameData={gameData}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                playerPoints={match.append.players}
                            />
                        )
                    })}
                </tbody>
            </table>
    }

    if(isLoaded) {
        displayPlayerCheckBoxes = 
            <div>
                {playerData.map((player) =>
                    <DisplayPlayerCheckBoxes
                        player={player}
                        match_players={matchPlayers}
                        set_match_players={setMatchPlayers}
                        edit={false}
                    />
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
        loadMatchData();
    };
    
    async function handleDelete(e) {
        const matchId = e.target.value;
        await deleteMatch(matchId);
        await loadMatchData();
        loadPlayerData();
    };

    async function handleEdit(matchId) {
        const updateMatchObj = {};
        updateMatchObj.match_date = editMatchDate;
        updateMatchObj.game_id = parseInt(editMatchGame);
        console.log(updateMatchObj);
        await updateMatch(matchId, updateMatchObj);
        for (const [playerId, points] of Object.entries(editMatchPlayers)) {
            await createPlayerMatch(playerId, points, matchId);
        };
        await loadMatchData();
        loadPlayerData();
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