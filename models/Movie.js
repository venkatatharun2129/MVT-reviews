const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        },
        year: {
            type: Number,
            required: true
        },

        cast: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Actor"
            }
        ],

        language: {
            type: String,
            required: true
        },
        categories: [
            {
                type: String
            }
        ],

        review: {
            type: String,
            default: ""
        },
        watchOn: [
            {
                type: String
            }
        ],

        trailer: {
            type: String
        },
        family: String,
        like: Number
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", movieSchema);
