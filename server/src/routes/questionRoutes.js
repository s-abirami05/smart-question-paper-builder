import express from "express";
import {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  createPaper
} from "../controllers/questionController.js";

// Question Model Import (உங்கள் Model Path-க்கு ஏற்ப இதைச் சரிபார்க்கவும்)
// Example: File பெயர் QuestionPaper.js ஆக இருந்தால்
import QuestionPaper from "../models/QuestionPaper.js";

const router = express.Router();

// ==========================================
// 1. Saved Question Paper Routes (Frontend-க்காக)
// ==========================================

// Save New Paper
router.post("/save", createPaper);

// Get All Saved Papers List
router.get("/list", async (req, res) => {
  try {
    const papers = await QuestionPaper.find({}, "collegeName examName subjectCode subjectName date");
    res.status(200).json(papers);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch papers list", error: err.message });
  }
});

// Get Single Paper by ID (For Editing)
router.get("/:id", async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ success: false, message: "Paper not found" });
    }
    res.status(200).json(paper);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch paper detail", error: err.message });
  }
});

// Update Existing Paper by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedPaper = await QuestionPaper.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedPaper) {
      return res.status(404).json({ success: false, message: "Paper not found to update" });
    }
    res.status(200).json({ success: true, message: "Question Paper Updated Successfully", data: updatedPaper });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update paper", error: err.message });
  }
});

// ==========================================
// 2. Existing Controller Routes (உங்களின் பழைய Routes)
// ==========================================

// Create Question Paper
router.post("/", createPaper);

// Add Question
router.post("/add", addQuestion);

// Get Questions
router.get("/", getQuestions);

// Update Question
router.put("/:id", updateQuestion);

// Delete Question
router.delete("/:id", deleteQuestion);

export default router;