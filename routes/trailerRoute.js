const express = require("express");
const router = express.Router();
const { trailerPage, searchTrailer } = require("../controllers/trailerController");

router.get("/search", searchTrailer);

module.exports = router;
