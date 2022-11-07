import React, {useEffect, useState} from "react";
import './Games.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DisplayPopUp from './DisplayPopup.js';
import {readGames, createGame, updateGame, deleteGame} from './GameCRUD.js';

let displayGames = <p>Loading...</p>

function Games({ gameData, setGameData }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [isHighScore, setIsHighScore] = useState(true);
    const [newGameName, setNewGameName] = useState()

    useEffect(() => {
        async function initialLoad(){
            const games = await readGames();
            await setGameData(games);
            setIsLoaded(true);
        };
        initialLoad()
    }, []);

    async function handleNewGame(e) {
        e.preventDefault();
        if(newGameName){
            await createGame(newGameName, isHighScore);
            const games = await readGames();
            await setGameData(games);
        } else {
            alert("Please enter game name");
        }
    };

    async function handleDelete(id) {
        await deleteGame(id);
        const games = await readGames();
        await setGameData(games);
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
                        <tr key={`${game.name}${game.id}`}>
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
                                readGames={readGames}
                                setGameData={setGameData}
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
                <Popup
                    key={`newgamepopup`}
                    trigger={<button className={"button-element"}>Create New Game</button>}
                    position="bottom right"
                >
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
                </Popup>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"game-container"}>
                {displayGames}
            </div>
        </div>
    );
};

export default Games;