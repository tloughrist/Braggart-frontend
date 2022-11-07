import React, {useState, useEffect} from "react";
import './Matches.css';
import DisplayOptions from "./DisplayOptions";

function DisplayEditDateGame({ gameData, match, setEditMatchDate, setEditMatchGame }){
    const [matchDate, setMatchDate] = useState(match.match_date);
    const [matchGame, setMatchGame] = useState(match.game_id);

    useEffect(() => {
        setEditMatchDate(matchDate);
        setEditMatchGame(matchGame);
    }, []);

    function handleDateChange(e) {
        setMatchDate(e.target.value);
        setEditMatchDate(e.target.value);
    };

    function handleGameChange(e) {
        setMatchGame(e.target.value);
        setEditMatchGame(e.target.value);
    };

    return (
        <div key={`EditMatch${match.id}${match.match_date}`}>
            <input
                type="date"
                value={matchDate}
                onChange={(e) => handleDateChange(e)}
            >
            </input>
            <select
                value={matchGame}
                onChange={(e) => handleGameChange(e)}
            >
                {gameData.map((game) => 
                    <DisplayOptions
                        key={`optionsfor${game.name}`}
                        game={game}
                        game_id={match.game_id}
                    />
                )}
            </select>
        </div>
    );
};

export default DisplayEditDateGame