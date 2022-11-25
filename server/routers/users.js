const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require("../controllers/users");

router.route("/").get(getAllUsers);
router.route("/:accountId").patch(updateUser).delete(deleteUser);

module.exports = router;
