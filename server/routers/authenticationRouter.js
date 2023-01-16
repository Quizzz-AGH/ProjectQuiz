const express = require("express");
const router = express.Router();
const { register, login, logout, loginAsGuest } = require("../controllers/authenticationController");

// Routes
router.route("/register").post(register);
router.route("/register/guest").post(loginAsGuest);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
