import React, {useEffect, useState} from "react";
import './Matches.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DisplayMatches from './DisplayMatches.js';
import {readMatches, readPlayers, readGames, createMatch, createPlayerMatch, deleteMatch, updateMatch, removePlayerMatches} from './MatchCRUD.js';

let displayMatches = <p>Loading...</p>;
let displayGames = <p>Loading...</p>;

function Matches({ playerData, gameData, setPlayerData, setGameData }) {
    
    const [matchData, setMatchData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    //States to hold data for creating matches
    const [matchDate, setMatchDate] = useState(Date());
    const [matchGame, setMatchGame] = useState();

    //States to hold data for editing matches
    const [editMatchDate, setEditMatchDate] = useState();
    const [editMatchPlayers, setEditMatchPlayers] = useState({});
    const [editMatchGame, setEditMatchGame] = useState();

    useEffect(() =>
        {async function initialLoad(){
            const matches = await readMatches();
            setMatchData(matches);
            const games = await readGames();
            setGameData(games);
            if(games.length > 0){
                setMatchGame(games[0].id);
            }
            const players = await readPlayers();
            setPlayerData(players);
            setIsLoaded(true);
        };
        initialLoad();
    }, []);

    async function handleMatchSubmit(e) {
        e.preventDefault();
        if(matchDate && matchGame){
            const matches = await createMatch(matchDate, matchGame);
            setMatchData(matches);
        } else {
            alert("Please enter date and game");
        } 
    };
    
    async function handleDelete(e) {
        const matchId = e.target.value;
        const matches = await deleteMatch(matchId);
        setMatchData(matches);
        const players = await readPlayers();
        setPlayerData(players);
    };

    async function handleEdit(matchId) {
        const updateMatchObj = {};
        updateMatchObj.match_date = editMatchDate;
        updateMatchObj.game_id = parseInt(editMatchGame);
        await removePlayerMatches(matchId);
        for (const [playerId, points] of Object.entries(editMatchPlayers)) {
            await createPlayerMatch(playerId, points, matchId);
        };
        const matches = await updateMatch(matchId, updateMatchObj);
        setMatchData(matches);
        const players = await readPlayers();
         setPlayerData(players);
    };

    if(isLoaded) {
        displayMatches = 
            <table key="match_table">
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
                        const playerPoints = match.append.players? Object.entries(match.append.players) : {};
                        const playerPointsArr = [];
                        if(playerPoints.length > 0) {
                            for (const [key, value] of playerPoints) {
                                playerPointsArr.push(`${key}(${value})`);
                            };
                        }
                        return (
                            <DisplayMatches
                                key={`match${match.id}`}
                                match={match}
                                playerData={playerData}
                                editMatchPlayers={editMatchPlayers}
                                setEditMatchDate={setEditMatchDate}
                                setEditMatchGame={setEditMatchGame}
                                setEditMatchPlayers={setEditMatchPlayers}
                                gameData={gameData}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                playerPoints={match.append.players}
                                playerPointsArr={playerPointsArr}
                            />
                        )
                    })}
                </tbody>
            </table>
    }

    if(isLoaded) {
        displayGames = 
            <select onChange={(e) => setMatchGame(e.target.value)} id="new-game-select">
                {gameData.map((game) =>
                    <option key={`option${game.name}`} value={game.id}>
                        {game.name}
                    </option>
                )}   
            </select>
    }
    
    return (
        <div className="matches">
            <div className={"button-container"}>
                <Popup
                    key={`newplayerpopup`}
                    trigger={<button className={"button-element"}>Create New Match</button>}
                    position="bottom right"
                >
                    <form onSubmit={handleMatchSubmit}>
                        <input
                            type="date"
                            onChange={(e) => setMatchDate(e.target.value)}
                            id="new-date-input"
                        ></input>
                        <div id="game-container">
                            {displayGames}
                        </div>
                        <input
                            type="submit"
                            className={"button-element"}
                            value="Add New Match"
                        ></input>
                    </form>
                </Popup>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"match-container"}>
                {displayMatches}
            </div>
        </div>
    );
};

export default Matches;