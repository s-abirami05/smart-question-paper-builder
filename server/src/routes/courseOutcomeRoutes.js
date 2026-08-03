import express from "express";


import {
    createCourseOutcome,
    getCourseOutcomes,
    updateCourseOutcome,
    deleteCourseOutcome
} from "../controllers/courseOutcomeController.js";



const router = express.Router();



// Create CO

router.post(
    "/",
    createCourseOutcome
);



// Get CO based on Subject

router.get(
    "/subject/:subjectId",
    getCourseOutcomes
);



// Update CO

router.put(
    "/:id",
    updateCourseOutcome
);



// Delete CO

router.delete(
    "/:id",
    deleteCourseOutcome
);



export default router;