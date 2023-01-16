const express = require("express");
const router = express.Router();
const {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
  getLobbyInfo,
  leaveLobby,
} = require("../controllers/lobbyController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

// Routes
router.route("/normal").post(authenticateUser, authorizePermissions("admin", "user", "guest"), createNormalGame);
router.route("/ranked").post(authenticateUser, authorizePermissions("admin", "user", "guest"), createRankedGame);
router.route("/join/:gameCode").post(authenticateUser, authorizePermissions("admin", "user", "guest"), joinNormalGame);
router.route("/leave").get(leaveLobby);
router.route("/:id").get(getLobbyInfo);

module.exports = router;
