const express = require("express");
const router = express.Router();
const { createNormalGame, createRankedGame, joinNormalGame, getLobbyInfo } = require("../controllers/queuesController");

router.route("/normal").post(createNormalGame);
router.route("/ranked").post(createRankedGame);
router.route("/join/:gameCode").post(joinNormalGame);
router.route("/:gameCode").get(getLobbyInfo);

module.exports = router;
