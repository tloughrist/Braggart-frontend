import React, {useState, useEffect} from "react";
import './Matches.css';

function DisplayPlayerCheckBoxes({ player, match_players, set_match_players, playerPoints, edit }){
    
    const [isChecked, setIsChecked] = useState(false);
    const [points, setPoints] = useState(0);
    const [playerId, setPlayerId] = useState(player.id);
    const [editIsLoaded, setEditIsLoaded] = useState(false);
    
    useEffect(() => {
        if(edit && playerPoints){
            Object.keys(playerPoints).includes(player.name) ? setIsChecked(true) : setIsChecked(false);
            playerPoints[player.name] ? setPoints(playerPoints[player.name]) : setPoints("");
            setEditIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        const newMatchPlayers = match_players;
        if(points){
            newMatchPlayers[playerId] = points;
        } else {
            delete newMatchPlayers[playerId];
        }
        set_match_players({...newMatchPlayers});
    }, [editIsLoaded]);

    function handleCheck(e){
        setIsChecked(!isChecked);
        if(!isChecked){
            const newMatchPlayers = match_players;
            if(points >= 0){
                newMatchPlayers[playerId] = points;
            }
            set_match_players({...newMatchPlayers});
        } else if(match_players !== undefined) {
            setPoints("");
            const match_playersSans = match_players;
            delete match_playersSans[playerId];
            set_match_players({...match_playersSans});
        } else {
            return;
        }
    };

    function handlePoints(e){
        setIsChecked(true);
        e.target.value.length > 0 ? setPoints(parseInt(e.target.value)) : setPoints("");
    };

    useEffect(() => {
        if(isChecked){
            const newMatchPlayers = match_players;
            if(points){
                newMatchPlayers[playerId] = points;
            }
            set_match_players({...newMatchPlayers});
        }
    }, [points]);

    return (
        <span>
            <p>
                <input
                    type="checkbox"
                    value={playerId}
                    name={player.name}
                    checked={isChecked}
                    onChange={(e) => handleCheck(e)}
                    className="checkbox"
                ></input>
                <label htmlFor={player.name}>{player.name}</label>
            </p>
            <p>
                <input
                    type="number"
                    name={`${player.name}points`}
                    value={points}
                    onChange={(e) => handlePoints(e)}
                    className="points"
                ></input>
                <label htmlFor={`${player.name}points`}>points</label>
            </p>
        </span>
    );
};

export default DisplayPlayerCheckBoxes;