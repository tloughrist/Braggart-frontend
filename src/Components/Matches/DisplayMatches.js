import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Matches.css';
import DisplayPlayerCheckBoxes from "./DisplayPlayerCheckBoxes";
import DisplayOptions from "./DisplayOptions";

function DisplayMatches({ match, playerPointsArr, editMatchGame, editMatchPlayers, setEditMatchDate, setEditMatchGame, setEditMatchPlayers, gameData, handleDelete, handleEdit, playerData, playerPoints }) {

    const [matchDate, setMatchDate] = useState(match.match_date);

    function handleDateChange(e) {
        setMatchDate(e.target.value);
        setEditMatchDate(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleEdit(match);
    }

    return (
    <>
        <tr key={`${match.id}${match.match_date}`}>
            <td>{match.match_date}</td>
            <td>{match.append.game}</td>
            <td>{playerPointsArr.map((entry, index) =>
                <span key={`${match.id}${entry}`}>
                    {(index != 0 ? ', ' : '') + entry}
                </span>
            )}</td>
            <td>{match.append.winner}</td>
            <td><Popup trigger={<button>Edit</button>} position="bottom right">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="date"
                        value={matchDate}
                        onChange={(e) => handleDateChange(e)}
                    >
                    </input>
                    <select
                        value={editMatchGame}
                        onChange={(e) => setEditMatchGame(e.target.value)}
                    >
                        {gameData.map((game) => 
                            <DisplayOptions game={game} game_id={match.game_id} />
                        )}
                    </select>
                    {playerData.map((player) =>
                        <DisplayPlayerCheckBoxes
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
    </>
    )
};

export default DisplayMatches;