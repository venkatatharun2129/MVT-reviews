const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const adminAuth = require("../middlewares/auth");

router.get("/login", adminController.loginPage);

router.post("/login", adminController.login);

router.get("/dashboard", adminController.dashboard);
router.get("/check", adminController.checkAdmin);

router.get("/logout", adminController.logout);

module.exports = router;
