import express from "express";

import {
  predict,
  suggest,
  savePrediction,
} from "../controllers/predictionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/predict", protect, predict);

router.post("/suggest", protect, suggest);

router.post("/save-log", protect, savePrediction);

export default router;