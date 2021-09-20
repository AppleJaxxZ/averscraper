const express = require("express");

const router = express.Router();

const controllers = require("../controllers/controllers");

router.get("/", controllers.home);
router.get("/login", controllers.login);
router.post("/results", controllers.results);

module.exports = router;
