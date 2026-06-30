const Movie = require("../models/Movie");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");


// Add Movie
exports.addMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.create(req.body);

    res.status(201).json({
        success: true,
        message: "Movie added successfully",
        movie
    });
});

// Get All Movies (Pagination + Filter)
exports.getMovies = asyncHandler(async (req, res) => {
  
    const movies = await Movie.find().populate("cast")
    if (!movies) {
        return next(
            new ErrorResponse("Movie not found", 404)
        );
    }

    res.status(200).json({
        success: true,
        movies
    });
});

// Get Single Movie
exports.singleMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)
        .populate("cast");

    if (!movie) {
        return next(
            new ErrorResponse("Movie not found", 404)
        );
    }

    res.status(200).json({
        success: true,
        movie
    });
});

// Update Movie
exports.updateMovie = asyncHandler(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
        return next(
            new ErrorResponse("Movie not found", 404)
        );
    }

    movie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        movie
    });
});

// Delete Movie
exports.deleteMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return next(
            new ErrorResponse("Movie not found", 404)
        );
    }

    await movie.deleteOne();

    res.status(200).json({
        success: true,
        message: "Movie deleted successfully"
    });
});

// Search Movies
exports.searchMovies = asyncHandler(async (req, res) => {
    const keyword = req.query.q || "";

    const movies = await Movie.find({
        title: {
            $regex: keyword,
            $options: "i"
        }
    }).populate("cast");

    res.status(200).json({
        success: true,
        count: movies.length,
        movies
    });
});

// Latest Movies
exports.getLatestMovies = asyncHandler(async (req, res) => {

    const movies = await Movie.find()
        .sort({ releaseDate: -1 })
        .limit(10);

    res.status(200).json({
        success: true,
        movies
    });
});

// Top Rated Movies
exports.getTopRatedMovies = asyncHandler(async (req, res) => {

    const movies = await Movie.find()
        .sort({ rating: -1 })
        .limit(10);

    res.status(200).json({
        success: true,
        movies
    });
});

exports.filterMoviesPage =asyncHandler(async (req, res) => {
    const filter = {};

    const { category, year , language} = req.query;

    if (category) filter.categories = { $in: [category] };
    if (year) filter.year = Number(year);
    if (language) filter.language = language;

    const movies = await Movie.find(filter)
        .sort({ createdAt: -1 })
        .populate("cast");

    res.status(200).json({
        success: true,
        count: movies.length,
        movies
    });
});