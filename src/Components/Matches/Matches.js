import React, {useEffect, useState} from "react";
import './Matches.css';

function Matches({ playerData, gameData, matchData, setMatchData }) {
    
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadMatchData() {
        const response = await fetch("http://localhost:9292/matches");
        const data = await response.json();
        console.log(data);
        setMatchData(data);
        return setIsLoaded(true)
    };

    useEffect(() => {loadMatchData()}, []);

    //I need to build a table using this data
    const displayMatches = isLoaded ? matchData.map((match) => <p>{match.match_date}</p>) : <p>Loading...</p>;
    
    function handleNewMatch() {
        console.log("NewMatch");
    };
    
    function handleSearch() {
        console.log("Search");
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