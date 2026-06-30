const express = require("express");
const router = express.Router();

const {
    addMovie,
    getMovies,
    singleMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
    getLatestMovies,
    getTopRatedMovies,
    filterMoviesPage,
} = require("../controllers/movieController");

router.post("/", addMovie);

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/latest", getLatestMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/filter", filterMoviesPage);

router.get("/:id", singleMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;