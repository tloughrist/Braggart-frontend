import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Banner.css';

function Banner() {
    return (
        <div className="banner">
            <div className="logo-container">
                <img id="logo" src="/braggart.png" alt="Braggart logo" />
            </div>
            <nav role="navigation">
                <div id="tab"></div>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li><NavLink to="/players" exact className={useLocation().pathname === "/players" ? "navlink navlink-active" : "navlink"}>Players</NavLink></li>
                        <li><NavLink to="/games" exact className={useLocation().pathname.includes("/games") ? "navlink navlink-active" : "navlink"}>Games</NavLink></li>
                        <li><NavLink to="/matches" exact className={useLocation().pathname === "/matches" ? "navlink navlink-active" : "navlink"}>Matches</NavLink></li>
                        <li><NavLink to="/statboard" exact className={useLocation().pathname === "/statboard" ? "navlink navlink-active" : "navlink"}>Stat Board</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Banner;