document.addEventListener("DOMContentLoaded", () => {
  initMoviesPage();
});

function getParams() {
  return new URLSearchParams(window.location.search);
}

async function initMoviesPage() {
  const params = getParams();
  const page = params.get("page") || 1;

  const url = "/api/movies/filter?" + params.toString();

  const res = await fetch(url);
  const data = await res.json();

  renderMovies(data.movies);
  renderPagination(data.currentPage, data.totalPages);
}
//*******
function renderPagination(current, total) {
  const div = document.getElementById("pagination");
  if (!div) return;

  div.innerHTML = `
    <button onclick="goPage(${current - 1})" ${current <= 1 ? "disabled" : ""}>Prev</button>
    <span>${current} / ${total}</span>
    <button onclick="goPage(${current + 1})" ${current >= total ? "disabled" : ""}>Next</button>
  `;
}
function goPage(page) {
  const params = new URLSearchParams(window.location.search);

  params.set("page", page);

  window.location.search = params.toString();
}