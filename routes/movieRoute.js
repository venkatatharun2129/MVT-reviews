const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const {
    getMovie,
    addMovie,
    getMoviesByActor,
    getFilterMovies,
    getTopRatedMovies,
    singleMovie,
    deleteMovie,
    homePage
} = require("../controllers/movieController");
router.get("/", getMovie);
router.post("/", addMovie);
router.get("/filter", getFilterMovies);

router.get("/top-rated", getTopRatedMovies);
router.get("/:id", singleMovie);
router.get("/actor/:actorId", getMoviesByActor);


router.delete("/:id", deleteMovie);
module.exports = router;
