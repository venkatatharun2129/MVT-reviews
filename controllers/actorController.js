// controllers/actorController.js

const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

const getActors = async (req, res) => {
    try {
        const actors = await Actor.find().sort({ name: 1 });

        res.json(actors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//searchActors

const searchActors = async (req, res) => {
    try {
        const keyword = req.query.q || "";

        const actors = await Actor.find({
            name: {
                $regex: String(keyword),
                $options: "i"
            }
        });

        res.json(actors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//singleActor

const singleActor = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);

        const movies = await Movie.find({
            cast: req.params.id
        }).populate("cast");

        res.json({ actor, movies });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getActors,
    searchActors,
    singleActor
};
