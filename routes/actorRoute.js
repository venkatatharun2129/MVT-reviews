// routes/actorRoutes.js

const express = require("express");

const router = express.Router();

const {
  getActors,
  searchActors,
  singleActor,
} = require("../controllers/actorController");

router.get("/", getActors);


router.get("/search", searchActors);
router.get("/:id", singleActor)

module.exports = router;