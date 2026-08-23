import express from "express";


import {

    addSemester,
    getSemesters,
    deleteSemester

} from "../controllers/semesterController.js";



const router = express.Router();



// Add Semester

router.post(
    "/",
    addSemester
);



// Get All Semesters

router.get(
    "/",
    getSemesters
);



// Delete Semester

router.delete(
    "/:id",
    deleteSemester
);



export default router;