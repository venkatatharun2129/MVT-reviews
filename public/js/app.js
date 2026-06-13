const movieGrid = document.getElementById("movieGrid");
const categoriesDiv = document.querySelector(".categoriesDiv");
const movieSearch = document.getElementById("movieSearch")
const searchResults = document.getElementById("searchResults")

function showDiv() {
    categoriesDiv.classList.toggle("show");
}
let allMovies=[]

const fetchMovies = async () => {
  
        const response = await fetch("/api/movies");

        allMovies = await response.json();
        showMovies(allMovies)
}


const showMovies= async(movies)=>{
  try{
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


// 🔍 Live search
movieSearch.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();
  searchResults.innerHTML = "";

  if (value === "") {
    searchResults.style.display = "none";
    return;
  }

  let filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(value)
  );

  if (filtered.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  filtered.forEach(movie => {
    const a = document.createElement("a");
    a.href = `/movie/${movie._id}`; // ✅ better for your backend routes
    a.innerText = movie.title;

    searchResults.appendChild(a);
  });

  searchResults.style.display = "block";
});
// ❌ close searchResults when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".container")) {
    searchResults.style.display = "none";
  }
});

fetchMovies();