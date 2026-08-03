import { predictQuestion } from "../services/predictionService.js";
import { getSuggestions } from "../services/suggestionEngine.js";
import PredictionLog from "../models/PredictionLog.js";

// Predict CO, BL, PI
export const predict = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prediction = predictQuestion(question);

    return res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Suggest CO, BL, PI
export const suggest = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const suggestions = getSuggestions(question);

    return res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Save Prediction Log
export const savePrediction = async (req, res) => {
  try {
    const { question, predictedCO, predictedBL, predictedPI } = req.body;

    const log = await PredictionLog.create({
      question,
      predictedCO,
      predictedBL,
      predictedPI,
    });

    return res.status(201).json({
      success: true,
      message: "Prediction saved successfully",
      data: log,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};