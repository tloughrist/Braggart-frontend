export async function readPlayers() {
    const response = await fetch("http://localhost:9292/players");
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function createPlayer(name) {
    const response = await fetch("http://localhost:9292/players", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name: name
        })
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function updatePlayer(id, name) {
    const response = await fetch(`http://localhost:9292/players/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name: name
        })
    });
    const data = await response.json();
    //console.log(data);
    return data;
};

export async function deletePlayer(id) {
    const response = await fetch(`http://localhost:9292/players/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    //console.log(data);
    return data;
};