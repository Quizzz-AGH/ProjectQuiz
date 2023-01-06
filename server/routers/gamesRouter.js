const express = require("express");
const router = express.Router();
const { getGameHistory } = require("../controllers/gamesController");

router.route("/:accountId").get();

module.exports = router;
