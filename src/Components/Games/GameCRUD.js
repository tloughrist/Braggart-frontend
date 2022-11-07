export async function readGames() {
    const response = await fetch("http://localhost:9292/games");
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function createGame(name, high_score_to_win) {
    const response = await fetch("http://localhost:9292/games", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            high_score_to_win: high_score_to_win
        })
    });
    const data = await response.json();
    //console.log(data);
    return data.id;
};

export async function updateGame(id, name, high_score_to_win) {
    const response = await fetch(`http://localhost:9292/games/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            high_score_to_win: high_score_to_win
        })
    });
    const data = await response.json();
    //console.log(data);
    return data.id;
};

export async function deleteGame(id) {
    const response = await fetch(`http://localhost:9292/games/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    //console.log(data);
};