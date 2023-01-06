const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require("../controllers/usersController");

router.route("/").get(getAllUsers);
router.route("/:accountId").patch(updateUser).delete(deleteUser);

module.exports = router;
