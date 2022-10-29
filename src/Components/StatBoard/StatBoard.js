import React from "react";
import './StatBoard.css';

function StatBoard() {
    return (
        <div className="statboard">
            <div className={"button-container"}>
                <button className={"button-element"}>Add Player</button>
            </div>
            <hr id="hr-divider"></hr>
            <div className={"stat-container"}>
                <p>Content</p>
            </div>
        </div>
    );
};

export default StatBoard;