import express from "express";

import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// Protected Routes

router.post("/", protect, createSubject);

router.get("/", protect, getSubjects);

router.put("/:id", protect, updateSubject);

router.delete("/:id", protect, deleteSubject);


export default router;