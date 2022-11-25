const express = require("express");
const router = express.Router();
const { getGameHistory } = require("../controllers/games");

router.route("/:accountId").get();

module.exports = router;
