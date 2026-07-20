const axios = require("axios");

exports.getFullMovieJson = async (req, res) => {
    try {
        const { movie, imdbId } = req.query;
        const apiKey = process.env.OMDB_API_KEY;

        if (!movie && !imdbId) {
            return res.json({
                success: false,
                message: "Movie name or IMDb ID is required"
            });
        }

        let id = imdbId;

        // If IMDb ID is not provided, search by movie name
        if (!id) {
            const searchUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&apikey=${apiKey}`;
            const searchRes = await axios.get(searchUrl);

            if (!searchRes.data.Search || searchRes.data.Search.length === 0) {
                return res.json({
                    success: false,
                    message: "No results found"
                });
            }

            id = searchRes.data.Search[0].imdbID;
        }

        // Get full details using IMDb ID
        const detailUrl = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${apiKey}`;
        const detailRes = await axios.get(detailUrl);

        if (detailRes.data.Response === "False") {
            return res.json({
                success: false,
                message: detailRes.data.Error
            });
        }

        return res.json({
            success: true,
            imdbId: id,
            data: detailRes.data
        });

    } catch (err) {
        return res.json({
            success: false,
            error: err.message
        });
    }
};