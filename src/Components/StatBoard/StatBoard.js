import React, {useEffect, useState} from "react";
import './StatBoard.css';

let displayStats = <p>Loading...</p>

function StatBoard() {

    const [statData, setStatData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    
    async function loadStatData() {
        const response = await fetch("http://localhost:9292/stat_blocks");
        const data = await response.json();
        console.log(data);
        setStatData(data);
        setIsLoaded(true)
    };

    useEffect(() => {loadStatData()}, []);

    if(isLoaded) {
        const gameNames = statData.map((statBlock) => statBlock.game.name);
        const gameNamesUniq = []; 
        gameNames.map((gameName) => {
            if(!gameNamesUniq.includes(gameName)){
                gameNamesUniq.push(gameName)
            }});
        displayStats =
            <div>
                {gameNamesUniq.map((gameName) => 
                    <div>
                        <h2>{gameName}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Player</th>
                                    <th># Matches</th>
                                    <th># Wins</th>
                                    <th>Win Rate</th>
                                    <th>Avg Point Deviation from Winner</th>
                                </tr>
                                {statData.map((statBlock) => {
                                    if(statBlock.game.name == gameName){
                                        return(
                                        <tr>
                                            <td>{statBlock.player_name}</td>
                                            <td>{statBlock.num_matches}</td>
                                            <td>{statBlock.wins}</td>
                                            <td>{statBlock.win_rate}</td>
                                            <td>{statBlock.avg_deviation}</td>
                                        </tr>)
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
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