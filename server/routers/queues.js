const express = require("express");
const router = express.Router();
const {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
} = require("../controllers/queues");

router.route("/normal").post(createNormalGame);
router.route("/ranked").post(createRankedGame);
router.route("/join/gameCode").post(joinNormalGame);

module.exports = router;
