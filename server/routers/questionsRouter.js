const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getSingleQuestion,
} = require("../controllers/questionsController");

const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllQuestions)
  .post(authenticateUser, authorizePermissions("admin"), createQuestion);
router
  .route("/:questionId")
  .get(getSingleQuestion)
  .patch(authenticateUser, authorizePermissions("admin"), updateQuestion)
  .delete(authenticateUser, authorizePermissions("admin"), deleteQuestion);

module.exports = router;
