import express from "express";

import {
  uploadSyllabus,
  getSyllabus,
} from "../controllers/syllabusController.js";

import protect from "../middleware/authMiddleware.js";

import upload from "../config/multer.js";


const router = express.Router();


// Upload Syllabus PDF

router.post(
  "/upload",
  protect,
  upload.single("syllabus"),
  uploadSyllabus
);


// Get Syllabus

router.get(
  "/",
  protect,
  getSyllabus
);


export default router;