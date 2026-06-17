const Movie = require("../models/Movie");

const getMovie = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate("cast")

            .sort({ createdAt: -1 });

        res.json(movies);
    } catch (err) {
        console.error("Error:", err);
    }
};

const addMovie = async (req, res) => {
    try {
        const {
            title,
            poster,
            rating,
            year,
            runtime,
            released,
            type,
            country,
            director,
            cast,
            language,
            categories,
            review,
            plot,
            watchOn,
            trailer,
            family,
            awards
        } = req.body;
        const movie = new Movie({
            title,
            poster,
            rating,
            year,
            runtime,
            released,
            type,
            country,
            director,
            cast,
            language,
            categories,
            review,
            plot,
            watchOn,
            trailer,
            family,
            awards
        });
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};
const getMoviesByActor = async (req, res) => {
    try {
        const actorId = req.params.actorId;

        const movies = await Movie.find({
            cast: actorId
        }).populate("cast");

        res.json(movies);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getFilterMovies = async (req, res) => {
    try {
        const { category, year, language } = req.query;

        let filter = {};

        if (category) {
            filter.categories = { $in: [category] };
        }
        if (year) {
            filter.year = Number(year);
        }

        if (language) {
            filter.language = language;
        }

        const movies = await Movie.find(filter);

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// 🏆 Top Rated Movies (Only 10)
const getTopRatedMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ rating: -1 }) // highest first
            .limit(10); // only 10 movies

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const singleMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate("cast");

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.json({
            message: "Movie deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getMovie,
    addMovie,
    getMoviesByActor,
    getFilterMovies,
    getTopRatedMovies,
    singleMovie,
    deleteMovie
};
