const movieForm = document.getElementById("movieForm");
const movieList = document.getElementById("movieList");

const actorSearch = document.getElementById("actorSearch");
const actorResults = document.getElementById("actorResults");

const selectedCastIds = [];

const selectedCastDiv = document.getElementById("selectedCast");
const categorySelect = document.getElementById("categories");
const selectWatchOn = document.getElementById("watchOn");

// FETCH MOVIES
async function fetchLatestMovie() {
    const response = await fetch("/api/movies/");
    const data = await response.json();

    if (!data.movies.length) {
        movieList.innerHTML = "<p>No movies available</p>";
        return;
    }
movieList.innerHTML=""
    // Latest uploaded movie
    data.movies.forEach(movie=>{
      movieList.innerHTML += `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <button onclick="editMovie('${movie._id}')">Edit</button>
            <button onclick="deleteMovie('${movie._id}')">Delete</button>
        </div>
        
        
    `;
      
    })

    
}

fetchLatestMovie();

function editMovie(id) {
    window.location.href = `/api/admin/update?id=${id}`;
}

// ADD MOVIE
if(movieForm) {
movieForm.addEventListener("submit", async e => {
    e.preventDefault();

    const movieData = {
        title: document.getElementById("title").value,
        poster: document.getElementById("poster").value,
        rating: document.getElementById("rating").value,
        year: document.getElementById("year").value,
        runtime: document.getElementById("runtime").value,
        released: document.getElementById("released").value,
        type: document.getElementById("type").value,
        country: document.getElementById("country").value,
        director: document.getElementById("director").value,
        cast: selectedCastIds,
        language: document.getElementById("language").value,
        categories: Array.from(categorySelect.selectedOptions).map(
            option => option.value
        ),
        review: document.getElementById("review").value,
        plot: document.getElementById("plot").value,
        watchOn: Array.from(selectWatchOn.selectedOptions).map(
            option => option.value
        ),
        trailer: document.getElementById("trailer").value,
        family: document.getElementById("family").value,
        awards: document.getElementById("awards").value,
    };

    await fetch("/api/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
    });

    alert("Movie Added Successfully ✅");

    movieForm.reset();

    selectedCastIds.length = 0;
    selectedCastDiv.innerHTML = "";

    fetchLatestMovie();
});
}
//delete movie
async function deleteMovie(id) {
    const confirmDelete = confirm("Are you sure you want to delete this movie?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/movies/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {
            alert("Movie deleted successfully");
            location.reload(); // Refresh the movie list
        } else {
            alert("Failed to delete movie");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
}

// SEARCH ACTORS
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
            <button
                type="button"
                onclick="addCast('${actor._id}','${actor.name}')"
            >
                ${actor.name}
            </button>
            <br><br>
        `;
    });
});

// ADD CAST
function addCast(id, name) {
    if (selectedCastIds.includes(id)) return;

    selectedCastIds.push(id);

    selectedCastDiv.innerHTML += `
        <span
            id="${id}"
            style="
                display:inline-block;
                background:#333;
                padding:8px;
                margin:5px;
                border-radius:6px;
            "
        >
            ${name}

            <button
                type="button"
                onclick="removeCast('${id}')"
            >
                X
            </button>
        </span>
    `;
}

// REMOVE CAST
function removeCast(id) {
    const index = selectedCastIds.indexOf(id);

    if (index > -1) {
        selectedCastIds.splice(index, 1);
    }

    const el = document.getElementById(id);

    if (el) {
        el.remove();
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
async function searchTrailer() {
    const title = document.getElementById("title").value;

    if (!title) {
        alert("Enter movie title first");
        return;
    }

    const res = await fetch(
        `/api/trailer/search?movie=${encodeURIComponent(title)}`
    );

    const data = await res.json();

    if (data.success) {
        document.getElementById("trailer").value = data.trailerUrl;

        document.getElementById("trailerPreview").innerHTML = `
            <iframe
                width="400"
                height="250"
                src="${data.trailerUrl}"
                allowfullscreen>
            </iframe>
        `;
    } else {
        alert("Trailer not found");
    }
}
async function fullMovie() {
    const input = document.getElementById("title").value.trim();

    if (!input) {
        alert("Enter movie name or IMDb ID");
        return;
    }

    // If input looks like an IMDb ID (tt1234567)
    const query = input.startsWith("tt")
        ? `imdbId=${encodeURIComponent(input)}`
        : `movie=${encodeURIComponent(input)}`;

    const res = await fetch(`/api/poster/full?${query}`);
    const data = await res.json();

    if (data.success) {
        document.getElementById("poster").value = data.data.Poster || "";
        document.getElementById("year").value = data.data.Year || "";
        document.getElementById("runtime").value = data.data.Runtime || "";
        document.getElementById("released").value = data.data.Released || "";
        document.getElementById("type").value = data.data.Type || "";
        document.getElementById("country").value = data.data.Country || "";
        document.getElementById("director").value = data.data.Director || "";
        document.getElementById("awards").value = data.data.Awards || "";
        document.getElementById("plot").value = data.data.Plot || "";

        document.getElementById("fullMovie").innerHTML = `
<pre style="background:#111;color:#0f0;padding:10px;border-radius:10px;overflow:auto;">
${JSON.stringify(data, null, 2)}
</pre>`;
    } else {
        alert(data.message || "Movie not found");
    }
}


checkAdmin();

fetchLatestMovie();
