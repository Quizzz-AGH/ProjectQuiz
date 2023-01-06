const express = require("express");
const router = express.Router();
const { getAllRankings } = require("../controllers/rankingsController");

router.route("/").get(getAllRankings);

module.exports = router;
