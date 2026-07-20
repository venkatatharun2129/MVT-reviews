const movieForm = document.getElementById("movieForm");
const actorSearch = document.getElementById("actorSearch");

if (movieForm) {
    movieForm.addEventListener("submit", async e => {
        e.preventDefault();

        const ActorData = {
            name: document.getElementById("name").value,
            image: document.getElementById("image").value,
            age: document.getElementById("age").value,
            bio: document.getElementById("bio").value,
            type: document.getElementById("type").value,
            gender: document.getElementById("gender").value
        };

        await fetch("/api/actors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ActorData)
        });

        alert("Actor Added Successfully ✅");

        movieForm.reset();
    });
}

actorSearch.addEventListener("input", async () => {
    const query = actorSearch.value.trim();

    if (!query) {
        actorResults.innerHTML = "";
        return;
    }

    const response = await fetch(`/api/actors/search?q=${query}`);

    const actors = await response.json();

    actorResults.innerHTML = "";

    actors.forEach(actor => {
        actorResults.innerHTML += `
 <div class="movie-card">
            <img src="${actor.image}" alt="${actor.name}">
            <h2>${actor.name}</h2>
            <p>${actor.bio}</p>
            <p>${actor.age}</p>
            <p>${actor.gender}</p>
            <p>${actor.type}</p>
            <button onclick="editActor('${actor._id}')">Edit</button>
            <button onclick="deleteActor('${actor._id}')">Delete</button>
        </div>
        `;
    });
});

function editActor(id) {
    window.location.href = `/api/admin/update-actor?id=${id}`;
}

async function deleteActor(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this actor?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/actors/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {
            alert("actor deleted successfully");
            location.reload(); // Refresh the actor list
        } else {
            alert("Failed to delete actor");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
}

async function checkAdmin() {
    try {
        const res = await fetch("/api/admin/check", {
            credentials: "include"
        });

        const data = await res.json();

        if (!data.success) {
            window.location.href = "/api/admin/login";
        }
    } catch (err) {
        window.location.href = "/api/admin/login";
    }
}
