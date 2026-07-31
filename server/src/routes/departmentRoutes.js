import express from "express";

import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes

router.post("/", protect, createDepartment);

router.get("/", protect, getDepartments);

router.put("/:id", protect, updateDepartment);

router.delete("/:id", protect, deleteDepartment);


export default router;