const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const paginate = require("../middlewares/paginate");
// ########## homePage ##########
exports.homePage = async (req, res) => {
    try {
        const movies = await Movie.find({ type: "movie" })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        const series = await Movie.find({ type: "series" })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        const topmovies = await Movie.find()
            .sort({ rating: -1 })
            .limit(10)
            .lean();

        res.render("index", {
            movies,
            series,
            topmovies
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("404");
    }
};

// ########## moviesPage ##########
exports.moviesPage = (req, res) => {
    res.render("movies", {
        movies: res.locals.movies,
        pagination: res.locals.pagination
    });
};
// ########## seriesPage ##########
exports.seriesPage = (req, res) => {
    res.render("series", {
        movies: res.locals.movies,
        pagination: res.locals.pagination
    });
};
// ########## filterMoviesPage ##########
exports.filterMoviesPage = async (req, res) => {
    const { category = "", year = "", language = "" } = req.query;

    const categories = [
        "Action",
        "Action-Adventure",
        "Action-Comedy",
        "Action-Thriller",
        "Adventure",
        "Adventure-Comedy",
        "Adventure-Drama",
        "Animation",
        "Biography",
        "Biographical-Drama",
        "Coming-of-Age",
        "Comedy",
        "Crime",
        "Crime-Thriller",
        "Dark-Comedy",
        "Detective",
        "Disaster",
        "Documentary",
        "Drama",
        "Epic",
        "Family",
        "Family-Drama",
        "Fantasy",
        "Fantasy-Adventure",
        "Heist",
        "Historical-Drama",
        "History",
        "Horror",
        "Kids",
        "Legal-Drama",
        "Martial-Arts",
        "Medical-Drama",
        "Mockumentary",
        "Music",
        "Musical",
        "Mystery",
        "Noir",
        "Parody",
        "Political-Drama",
        "Psychological-Thriller",
        "Road-Movie",
        "Romance",
        "Romantic-Comedy",
        "Romantic-Thriller",
        "Sci-Fi",
        "Science-Fantasy",
        "Sport",
        "Spy",
        "Superhero",
        "Supernatural",
        "Survival",
        "Teen",
        "Thriller",
        "Vampire",
        "War",
        "War-Drama",
        "Western",
        "Zombie"
    ];

    const years = [];
    for (let y = 2026; y >= 2001; y--) {
        years.push(y);
    }

    const languages = ["Telugu", "Telugu-Dubbed", "Hindi", "English"];

    res.render("filter", {
        movies: res.locals.movies, // ✅ Use res.locals.movies
        pagination: res.locals.pagination,
        filters: {
            categories,
            years,
            languages
        },
        selected: {
            category,
            year,
            language
        },
        movies: res.locals.movies,
        pagination: res.locals.pagination
    });
};
// ########## movieDetails ##########
exports.movieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate("cast")
            .lean();

        if (!movie) {
            return res.status(404).render("404");
        }

        res.render("movie", {
            movie,
            pagination: res.locals.pagination
        });
    } catch (err) {
        console.error(err);
        res.status(500).render("404");
    }
};
// ########## actorPage ##########
exports.actorPage = async (req, res) => {
    const actor = await Actor.findById(req.params.id);

    const actorMovies = await Movie.find({
        cast: actor._id
    });

    res.render("actor", {
        actor,
        actorMovies
    });
};
// ########## actorsPage ##########
exports.actorsPage = async (req, res) => {
    const actor = await Actor.find();

    res.render("actors", {
        actor
    });
};
// ########## aboutPage ##########
exports.aboutPage = (req, res) => {
    res.render("about-contact");
};

// ########## legalPage ##########
exports.legalPage = (req, res) => {
    res.render("legal");
};

// ########## top-ratedPage ##########
exports.topratedPage = (req, res) => {
    res.render("top-rated", {
        movies: res.locals.movies,
        pagination: res.locals.pagination
    });
};
// ########## searchPage ##########

exports.searchPage = (req, res) => {

    // Request from autocomplete
    if (req.headers["x-requested-with"] === "XMLHttpRequest") {
        return res.render("partials/movieGrid", {
            movies: res.locals.movies
        });
    }

    // Normal search page
    res.render("search", {
        movies: res.locals.movies,
        pagination: res.locals.pagination,
        query: req.query.q || ""
    });
};
exports.actorPage = async (req, res) => {
    const actor = await Actor.findById(req.params.id).lean();

    if (!actor) {
        return res.status(404).render("404");
    }

    res.render("actor", {
        actor,
        movies: res.locals.movies,
        pagination: res.locals.pagination
    });
};