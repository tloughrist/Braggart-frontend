import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Matches.css';
import DisplayPlayerCheckBoxes from "./DisplayPlayerCheckBoxes";
import DisplayEditDateGame from "./DisplayEditDateGame";

function DisplayMatches({ match, playerPointsArr, editMatchPlayers, setEditMatchDate, setEditMatchGame, setEditMatchPlayers, gameData, handleDelete, handleEdit, playerData, playerPoints }) {

    function handleSubmit(e) {
        e.preventDefault();
        handleEdit(match.id);
    };

    return (
        <tr key={`${match.id}${match.match_date}`}>
            <td>{match.match_date}</td>
            <td>{match.append.game}</td>
            <td>{playerPointsArr.map((entry, index) =>
                <span key={`${match.id}${entry}`}>
                    {(index != 0 ? ', ' : '') + entry}
                </span>
            )}</td>
            <td>{match.append.winner}</td>
            <td><Popup
                    key={`${match.id}popup`}
                    trigger={<button>Edit</button>}
                    position="bottom right"
                >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DisplayEditDateGame
                        gameData={gameData}
                        match={match}
                        setEditMatchDate={setEditMatchDate}
                        setEditMatchGame={setEditMatchGame}
                    />
                    {playerData.map((player) =>
                        <DisplayPlayerCheckBoxes
                            key={`playerCheck${player.id}`}
                            player={player}
                            match_players={editMatchPlayers}
                            set_match_players={setEditMatchPlayers}
                            playerPoints={playerPoints}
                            edit={true}
                        />
                    )}
                    <input type="submit" className={"button-element"} value="Submit Edit"></input>
                </form>
            </Popup></td>
            <td><button className={"button-element"} value={match.id} onClick={handleDelete}>Delete</button></td>
        </tr>
    )
};

export default DisplayMatches;