const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const paginate = require("../middlewares/paginate");

const renderController = require("../controllers/renderController");

router.get("/", renderController.homePage);
//########### moviesPage ############
router.get(
    "/movies",
    paginate(Movie, {
        limit: 12,
        filter: { type: "movie" }
    }),
    renderController.moviesPage
);
//########### seriesPage ############
router.get(
    "/series",
    paginate(Movie, {
        limit: 12,
        filter: { type: "series" }
    }),
    renderController.seriesPage
);

router.get(
    "/filter",
    paginate(Movie, {
        limit: 12,
        filter: req => {
            const filter = {};

            const { category, year, language } = req.query;

            if (category) filter.categories = { $in: [category] };
            if (year) filter.year = Number(year);
            if (language) filter.language = language;

            return filter;
        }
    }),
    renderController.filterMoviesPage
);

router.get(
    "/movie/:id",
    paginate(Movie, { limit: 12 }),
    renderController.movieDetails
);

router.get("/actors", renderController.actorsPage);
router.get("/about-contact", renderController.aboutPage);

router.get("/legal", renderController.legalPage);

router.get(
    "/top-rated",
    paginate(Movie, { limit: 12, sort: { rating: -1 } }),
    renderController.topratedPage
);
router.get(
    "/search",
    paginate(Movie, {
        limit: 12,
        filter: req => {
            const query = req.query.q || "";

            return query ? { title: { $regex: query, $options: "i" } } : {};
        }
    }),
    renderController.searchPage
);
router.get(
    "/actor/:id",
    paginate(Movie, {
        limit: 12,
        filter: req => ({
            cast: req.params.id
        }),
        populate: "cast"
    }),
    renderController.actorPage
);

module.exports = router;
