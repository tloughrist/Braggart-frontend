import React, {useEffect, useState} from "react";
import './Matches.css';

let displayMatches = <p>Loading...</p>

function Matches() {
    
    const [matchData, setMatchData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadMatchData() {
        const response = await fetch("http://localhost:9292/matches");
        const data = await response.json();
        console.log(data);
        setMatchData(data);
        return setIsLoaded(true)
    };

    useEffect(() => {loadMatchData()}, []);

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
                    </tr>
                    {matchData.map((match) =>
                        <tr key={`${match.id}${match.date}`}>
                            <td>{match.match_date}</td>
                            <td>{match.append.game}</td>
                            <td>{match.append.players.map((player, index) =>
                                <span key={`${match.id}${player}`}>
                                    {(index != 0 ? ', ' : '') + player}
                                </span>
                            )}</td>
                            <td>{match.append.winner}</td>
                            <td><button className={"button-element"} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
    }
    
    function handleNewMatch() {
        console.log("NewMatch");
    };
    
    function handleSearch() {
        console.log("Search");
    };

    function handleEdit() {
        console.log("Edit");
    };
    
    return (
        <div className="matches">
            <div className={"button-container"}>
                <input className={"search-element"} name="search" type="text" placeholder="Search matches..."></input>
                <input className={"button-element"} type="submit" onClick={handleSearch}></input>
                <button className={"button-element"} onClick={handleNewMatch}>Add New Match</button>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"match-container"}>
                {displayMatches}
            </div>
        </div>
    );
};

export default Matches;