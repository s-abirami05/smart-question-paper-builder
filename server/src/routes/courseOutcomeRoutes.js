import express from "express";

import {
  createCourseOutcome,
  getCourseOutcomes,
  updateCourseOutcome,
  deleteCourseOutcome,
} from "../controllers/courseOutcomeController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// Protected Routes

router.post("/", protect, createCourseOutcome);

router.get("/", protect, getCourseOutcomes);

router.put("/:id", protect, updateCourseOutcome);

router.delete("/:id", protect, deleteCourseOutcome);


export default router;