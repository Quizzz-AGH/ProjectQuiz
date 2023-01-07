const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, updateUserPassword } = require("../controllers/usersController");
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

router.route("/").get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/updatePassword").patch(authenticateUser, authorizePermissions("admin", "guest"), updateUserPassword);
router
  .route("/:accountId")
  .patch(authenticateUser, authorizePermissions("admin"), updateUser)
  .delete(authenticateUser, authorizePermissions("admin"), deleteUser);

module.exports = router;
