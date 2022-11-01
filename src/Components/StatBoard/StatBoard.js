import React, {useEffect, useState} from "react";
import './StatBoard.css';

let displayStats = <p>Loading...</p>

function StatBoard({ playerData, gameData, matchData }) {

    const [statData, setStatData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    
    async function loadStatData() {
        const response = await fetch("http://localhost:9292/stats");
        const data = await response.json();
        console.log(data);
        setStatData(data);
        setIsLoaded(true)
    };

    useEffect(() => {loadStatData()}, []);
    
    if(isLoaded) {
        displayStats =
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Game</th>
                            <th>Most Wins</th>
                            <th>Most/Least Avg. Points</th>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>Player</th>
                            <th>Most Wins</th>
                            <th>Most/Least Avg. Points</th>
                        </tr>
                    </tbody>
                </table>
            </div>
    }

    return (
        <div className="statboard">
            <div className={"button-container"}>
                <button className={"button-element"}>Add Player</button>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"stat-container"}>
                {displayStats}
            </div>
        </div>
    );
};

export default StatBoard;