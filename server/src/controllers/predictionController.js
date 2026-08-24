
import PredictionLog from "../models/PredictionLog.js";
import { getSuggestions } from "../services/suggestionEngine.js";
import { predictQuestion } from "../services/predictionService.js";

export const predict = (req, res) => {
  const { question, subjectCode } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({ message: "Question is required" });
  }

  return res.json(predictQuestion(question, subjectCode));
};

export const suggest = (req, res) => {
  const { question, subjectCode } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({ message: "Question is required" });
  }

  return res.json({
    suggestions: predictQuestion(question, subjectCode).prediction,
  });
};

export const savePrediction = async (req, res) => {
  try {
    const { question, prediction } = req.body;
    const savedPrediction = await PredictionLog.create({
      question,
      predictedCO: prediction.co,
      predictedBL: prediction.bloomLevel,
      predictedPI: prediction.pi,
    });

    return res.status(201).json(savedPrediction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
