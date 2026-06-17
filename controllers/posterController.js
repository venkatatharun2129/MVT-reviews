const axios = require("axios");

exports.getFullMovieJson = async (req, res) => {
    try {
        const title = req.query.movie;

        if (!title) {
            return res.json({
                success: false,
                message: "Movie name is required"
            });
        }

        const apiKey = process.env.OMDB_API_KEY;

        // STEP 1: Search movie
        const searchUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`;
        const searchRes = await axios.get(searchUrl);

        if (!searchRes.data.Search || searchRes.data.Search.length === 0) {
            return res.json({
                success: false,
                message: "No results found"
            });
        }

        const imdbId = searchRes.data.Search[0].imdbID;

        // STEP 2: Get FULL DATA
        const detailUrl = `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${apiKey}`;
        const detailRes = await axios.get(detailUrl);

        const data = detailRes.data;

        if (!data || data.Response === "False") {
            return res.json({
                success: false,
                message: "Movie details not found"
            });
        }

        // 🔥 RETURN FULL RAW JSON (CLEAN)
        return res.json({
            success: true,
            imdbId: imdbId,
            data: data
        });
    } catch (err) {
        return res.json({
            success: false,
            error: err.message
        });
    }
};
