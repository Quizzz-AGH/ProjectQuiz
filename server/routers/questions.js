const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questions");

router.route("/").get(getAllQuestions).post(createQuestion);
router.route("/:questionId").patch(updateQuestion).delete(deleteQuestion);

module.exports = router;
