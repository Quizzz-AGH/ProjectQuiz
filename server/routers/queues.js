const express = require("express");
const router = express.Router();

router.route("/normal").post();
router.route("/ranked").post();
router.route("/join/gameCode").post();
