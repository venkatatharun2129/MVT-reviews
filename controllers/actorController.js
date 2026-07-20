// controllers/actorController.js

const Actor = require("../models/Actor");
const Movie = require("../models/Movie");

const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
//GET ACTORS
exports.getActors = asyncHandler(async (req, res) => {
    const actors = await Actor.find().sort({ name: 1 });

    res.json(actors);
    res.status(500).json({
        message: error.message
    });
});

//searchActors

exports.searchActors = asyncHandler(async (req, res) => {
    const keyword = req.query.q || "";

    const actors = await Actor.find({
        name: {
            $regex: String(keyword),
            $options: "i"
        }
    });

    res.json(actors);
    res.status(500).json({
        message: "Error Occured"
    });
});
//singleActor

exports.singleActor = asyncHandler(async (req, res) => {
    const actor = await Actor.findById(req.params.id);

    if (!actor) {
        return res.status(404).json({
            message: "Actor not found"
        });
    }

    res.json(actor);
});
/*==============
Add Actor
================*/
exports.addActor = asyncHandler(async (req, res) => {
    const actor = await Actor.create(req.body);

    res.status(201).json({
        success: true,
        message: "Actor added successfully",
        actor
    });
});
/*====================
UPDATE ACTOR
====================*/

exports.updateActor = asyncHandler(async (req, res, next) => {
    let actor = await Actor.findById(req.params.id);

    if (!actor) {
        return next(new ErrorResponse("Actor not found", 404));
    }

    actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Actor updated successfully",
        actor
    });
});
/*=================
Delete Actor
=================*/
exports.deleteActor = asyncHandler(async (req, res, next) => {
    const actor = await Actor.findById(req.params.id);

    if (!actor) {
        return next(new ErrorResponse("Actor not found", 404));
    }

    await actor.deleteOne();

    res.status(200).json({
        success: true,
        message: "Actor deleted successfully"
    });
});
