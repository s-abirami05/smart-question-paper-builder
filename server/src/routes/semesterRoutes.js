import express from "express";

import {
  createSemester,
  getSemesters,
  updateSemester,
  deleteSemester,
} from "../controllers/semesterController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// Protected Routes

router.post("/", protect, createSemester);

router.get("/", protect, getSemesters);

router.put("/:id", protect, updateSemester);

router.delete("/:id", protect, deleteSemester);


export default router;