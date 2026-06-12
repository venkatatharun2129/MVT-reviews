const movieForm = document.getElementById("movieForm");
const movieList = document.getElementById("movieList");

const actorSearch = document.getElementById("actorSearch");
const actorResults = document.getElementById("actorResults");

const selectedCastIds = [];

const selectedCastDiv = document.getElementById("selectedCast");
const categorySelect = document.getElementById("categories");
const selectWatchOn = document.getElementById("watchOn");

// FETCH MOVIES
async function fetchMovies() {
    const response = await fetch("/api/movies");
    const movies = await response.json();

    movieList.innerHTML = "";

    movies.forEach(movie => {
        movieList.innerHTML += `
        <div class="movie-card">

            <img
                src="${movie.poster}"
                referrerpolicy="no-referrer"
            />

            <div>
                <h2>${movie.title}</h2>

                <p>Release: ${movie.year || ""}</p>
                <p>⭐ ${movie.rating}/10</p>


                <p>
Categories:
${movie.categories?.join(", ") || "No Categories"}
</p>

                <p>
                    Cast:
                    ${
                        movie.cast && movie.cast.length
                            ? movie.cast.map(actor => actor.name).join(", ")
                            : "No Cast"
                    }
                </p>

                <p>${movie.review}</p>
            </div>

        </div>
        `;
    });
}

// ADD MOVIE
movieForm.addEventListener("submit", async e => {
    e.preventDefault();

    const movieData = {
        title: document.getElementById("title").value,
        poster: document.getElementById("poster").value,
        rating: document.getElementById("rating").value,
        year: document.getElementById("year").value,
        cast: selectedCastIds,
        language: document.getElementById("language").value,
        categories: Array.from(categorySelect.selectedOptions).map(
            option => option.value
        ),
        review: document.getElementById("review").value,
        watchOn: Array.from(selectWatchOn.selectedOptions).map(
            option => option.value
        ),
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

    fetchMovies();
});

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
      window.location.href = "/html/admin-login.html";
    }

  } catch (err) {
    window.location.href = "/html/admin-login.html";
  }
}

checkAdmin();

fetchMovies();
