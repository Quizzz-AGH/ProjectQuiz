const express = require("express");
const router = express.Router();
const { getAllRankings } = require("../controllers/rankingsController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

router.route("/").get(authenticateUser, authorizePermissions("admin", "user"), getAllRankings);

module.exports = router;
