const express = require("express");
const router = express.Router();
const { saveGameHistory, getMyAllGameHistory, getSingleGameHistory } = require("../controllers/historyController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

// Routes
router.route("/save").post(authenticateUser, authorizePermissions("admin", "user", "guest"), saveGameHistory);
router
  .route("/getMyHistory")
  .get(authenticateUser, authorizePermissions("admin", "user", "guest"), getMyAllGameHistory);
router.route("/:gameId").get(authenticateUser, authorizePermissions("admin", "user", "guest"), getSingleGameHistory);
module.exports = router;
