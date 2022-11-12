export async function readMatches() {
    const response = await fetch("http://localhost:9292/matches");
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function readGames() {
    const response = await fetch("http://localhost:9292/games");
    const data = await response.json();
    return data;
};

export async function readPlayers() {
    const response = await fetch("http://localhost:9292/players");
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function createMatch(matchDate, matchGame) {
    const response = await fetch("http://localhost:9292/matches", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            match_date: matchDate,
            game_id: matchGame
        })
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function createPlayerMatch(playerId, points, matchId) {
    const response = await fetch("http://localhost:9292/player_matches", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            player_id: playerId,
            points: points,
            match_id: matchId
        })
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function deleteMatch(matchId) {
    const response = await fetch(`http://localhost:9292/matches/${matchId}`, {
        method: "DELETE"
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function removePlayerMatches(matchId) {
    const response = await fetch(`http://localhost:9292/matches/all_player_matches/${matchId}`, {
        method: "PATCH"
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function updateMatch(matchId, matchObj) {
    const response = await fetch(`http://localhost:9292/matches/${matchId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            match_date: matchObj.match_date,
            game_id: matchObj.game_id
        })
    });
    const data = await response.json();
    //console.log(data);
    return data;
};