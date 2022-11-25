const express = require("express");
const router = express.Router();
const { getAllRankings } = require("../controllers/rankings");

router.route("/").get(getAllRankings);

module.exports = router;
