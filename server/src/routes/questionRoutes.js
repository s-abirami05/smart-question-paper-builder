import express from "express";
import QuestionPaper from "../models/QuestionPaper.js";

const router = express.Router();

// 1. Save New Paper
router.post("/save", async (req, res) => {
  try {
    const newPaper = new QuestionPaper(req.body);
    const savedPaper = await newPaper.save();
    res.status(201).json({
      success: true,
      message: "Question Paper Saved Successfully",
      data: savedPaper,
    });
  } catch (err) {
    console.error("Error saving Question Paper:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save paper",
      error: err.message,
    });
  }
});

// 2. Get All Saved Papers List
router.get("/list", async (req, res) => {
  try {
    const papers = await QuestionPaper.find(
      {},
      "collegeName examName subjectCode subjectName date createdAt"
    ).sort({ createdAt: -1 });
    res.status(200).json(papers);
  } catch (err) {
    console.error("Error fetching list:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch papers list",
      error: err.message,
    });
  }
});

// 3. Get Single Paper by ID (For Edit / View)
router.get("/:id", async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ success: false, message: "Paper not found" });
    }
    res.status(200).json(paper);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch paper detail",
      error: err.message,
    });
  }
});

// 4. Update Existing Paper by ID
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
    res.status(200).json({
      success: true,
      message: "Question Paper Updated Successfully",
      data: updatedPaper,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update paper",
      error: err.message,
    });
  }
});

// 5. Delete Paper by ID 🗑️ (Frontend URL-க்கு ஏற்ப /delete/:id என மாற்றப்பட்டுள்ளது)
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPaper = await QuestionPaper.findByIdAndDelete(req.params.id);
    if (!deletedPaper) {
      return res.status(404).json({ success: false, message: "Paper not found to delete" });
    }
    res.status(200).json({
      success: true,
      message: "Question Paper Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting paper:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete paper",
      error: err.message,
    });
  }
});

export default router;