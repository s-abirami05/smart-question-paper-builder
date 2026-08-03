import mongoose from "mongoose";

const predictionLogSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    predictedCO: {
      type: String,
      required: true,
    },

    predictedBL: {
      type: String,
      required: true,
    },

    predictedPI: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PredictionLog = mongoose.model(
  "PredictionLog",
  predictionLogSchema
);

export default PredictionLog;