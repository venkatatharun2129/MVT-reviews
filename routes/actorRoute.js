// routes/actorRoutes.js

const express = require("express");

const router = express.Router();

const {
    getActors,
    searchActors,
    singleActor,
    addActor,
    updateActor,
    deleteActor
} = require("../controllers/actorController");
router.post("/", addActor);

router.get("/", getActors);

router.get("/search", searchActors);
router.get("/:id", singleActor);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);

module.exports = router;
