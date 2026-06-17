const express = require("express");
const router = express.Router();
const posterController = require("../controllers/posterController");

// Get poster by movie name

router.get("/full", posterController.getFullMovieJson);

module.exports = router;