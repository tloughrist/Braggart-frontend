import React, {useEffect, useState} from "react";
import './Games.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function DisplayPopUp({ game, updateGame, readGames, setGameData }) {

    const [popIsChecked, setPopIsChecked] = useState(game.high_score_to_win);
    const [popIsHighScore, setPopIsHighScore] = useState(game.high_score_to_win);
    const [editIsHighScore, setEditIsHighScore] = useState(game.high_score_to_win);
    const [editGameName, setEditGameName] = useState(game.name);

    function handleCheck() {
        setPopIsChecked(!popIsChecked);
        setPopIsHighScore(!popIsHighScore);
        setEditIsHighScore(!editIsHighScore);
    };

    async function handleEditSubmit(e){
        e.preventDefault();
        const games = await updateGame(game.id, editGameName, editIsHighScore);
        await setGameData(games);
    };

    return (
        <td>
            <Popup
                key={`${game.id}popup`}
                trigger={<button className={"button-element"}>Edit</button>}
                position="bottom right"
            >
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        placeholder={game.name}
                        onChange={(e) => setEditGameName(e.target.value)}
                    ></input>
                    <input
                        type="checkbox"
                        value={popIsHighScore}
                        name="pop_highest?"
                        checked={popIsChecked}
                        onChange={handleCheck}
                    ></input>
                    <label htmlFor="pop_highest?">High Score Wins?</label>
                    <input type="submit" className={"button-element"} value="Submit Edit"></input>
                </form>
            </Popup>
        </td>
    );
}

export default DisplayPopUp;