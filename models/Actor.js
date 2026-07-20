// models/Actor.js

const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    image: String,
    name: {
        type: String,
        required: true
    },
    age: Number,
    bio: String,
    type: String,
    gender: String
});

module.exports = mongoose.model("Actor", actorSchema);
