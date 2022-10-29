import React from "react";
import './Matches.css';

function Matches() {

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
                <p>Content</p>                
            </div>
        </div>
    );
};

export default Matches;