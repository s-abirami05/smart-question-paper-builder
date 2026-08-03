import express from "express";
import {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  createPaper
} from "../controllers/questionController.js";

const router = express.Router();

// Create Question Paper
router.post("/create-paper", createPaper);

// Add Question
router.post("/add", addQuestion);

// Get Questions
router.get("/:questionPaperId", getQuestions);

// Update Question
router.put("/:id", updateQuestion);

// Delete Question
router.delete("/:id", deleteQuestion);

export default router;