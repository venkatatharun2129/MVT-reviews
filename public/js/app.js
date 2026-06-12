const movieGrid = document.getElementById("movieGrid");
const categoriesDiv = document.querySelector(".categoriesDiv");

function showDiv() {
    categoriesDiv.classList.toggle("show");
}

const fetchMovies = async () => {
    try {
        const response = await fetch("/api/movies");

        const movies = await response.json();

        movieGrid.innerHTML = "";


movies.forEach(movie => {
    movieGrid.innerHTML += `
        <a href="/movie/${movie._id}" class="movie-card">
    <img src="${movie.poster}" alt="${movie.title}" referrerpolicy="no-referrer">
    <h3>${movie.title}</h3>
    <p>⭐ ${movie.rating?.toFixed(1) || "N/A"}/10</p>
</a>`
});
    } catch (err) {
        console.log(err);
    }
};

fetchMovies();
