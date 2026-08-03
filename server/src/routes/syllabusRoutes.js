import express from "express";

import upload from "../middleware/upload.js";

import {
    uploadSyllabus,
    getSyllabus
} from "../controllers/syllabusController.js";


const router = express.Router();


router.post(
    "/upload",
    upload.single("syllabus"),
    uploadSyllabus
);


router.get(
    "/subject/:subjectId",
    getSyllabus
);


export default router;