import React, {useEffect, useState} from "react";
import './Games.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DisplayPopUp from './DisplayPopup.js';

let displayGames = <p>Loading...</p>

function Games({ playerData, gameData, setGameData }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [isHighScore, setIsHighScore] = useState(true);
    const [newGameName, setNewGameName] = useState();

    async function loadGameData() {
        const response = await fetch("http://localhost:9292/games");
        const data = await response.json();
        //console.log(data);
        setGameData(data);
        return setIsLoaded(true)
    };

    async function createGame(name, high_score_to_win) {
        const response = await fetch("http://localhost:9292/games", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                high_score_to_win: high_score_to_win
            })
        });
        const data = await response.json();
        //console.log(data);
        return data.id;
    };

    async function updateGame(id, name, high_score_to_win) {
        const response = await fetch(`http://localhost:9292/games/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                high_score_to_win: high_score_to_win
            })
        });
        const data = await response.json();
        console.log(data);
        return data.id;
    };

    async function deleteGame(id) {
        const response = await fetch(`http://localhost:9292/games/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        //console.log(data);
    };

    useEffect(() => {loadGameData()}, []);


    async function handleNewGame() {
        if(newGameName){
            await createGame(newGameName, isHighScore);
            loadGameData();
        } else {
            alert("Please enter game name");
        }
        
    };

    async function handleDelete(id) {
        await deleteGame(id);
        loadGameData();
    };

    function handleCheck() {
        setIsChecked(!isChecked);
        setIsHighScore(!isHighScore);
    };

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
                            <DisplayPopUp
                                game={game}
                                updateGame={updateGame}
                                loadGameData={loadGameData}
                            />
                            <td><button className={"button-element"} onClick={() => handleDelete(game.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }

    return (
        <div className="games">
            <div className={"button-container"}>
                <form onSubmit={handleNewGame}>
                    <input
                        type="text"
                        placeholder="Name of game"
                        onChange={(e) => setNewGameName(e.target.value)}
                        id="new-game-input"
                    ></input>
                    <label htmlFor="highest?" id="high-score-label">High Score Wins?</label>
                    <input
                        type="checkbox"
                        value={isHighScore}
                        name="highest?"
                        checked={isChecked}
                        onChange={handleCheck}
                        id="high-score-input"
                    ></input>
                    <input type="submit" className={"button-element"} value="Add New Game"></input>
                </form>    
            </div>
            <hr id="hr-divider"></hr>
            <div className={"game-container"}>
                {displayGames}
            </div>
        </div>
    );
};

export default Games;