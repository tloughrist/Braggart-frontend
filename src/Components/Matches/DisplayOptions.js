import React, {useState, useEffect} from "react";
import 'reactjs-popup/dist/index.css';
import './Matches.css';

function DisplayOptions({ game, game_id }){

    const [isSelected, setIsSelected] = useState();

    useEffect(() => {
        game.id == game_id ? setIsSelected(true) : setIsSelected(false);
    }, []);

    return (
        <option
            value={game.id}
            selected={isSelected}
        >
            {game.name}
        </option>
    );
};

export default DisplayOptions