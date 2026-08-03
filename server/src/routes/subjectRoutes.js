import express from "express";


import {
  createSubject,
  getSubjects,
  getSubjectsBySemester,
  updateSubject,
  deleteSubject
} from "../controllers/subjectController.js";



const router = express.Router();



// Create Subject

router.post(
  "/",
  createSubject
);



// Get All Subjects

router.get(
  "/",
  getSubjects
);



// Get Subjects By Semester

router.get(
  "/semester/:semesterId",
  getSubjectsBySemester
);



// Update Subject

router.put(
  "/:id",
  updateSubject
);



// Delete Subject

router.delete(
  "/:id",
  deleteSubject
);



export default router;