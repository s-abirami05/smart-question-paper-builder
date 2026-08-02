import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    questionNumber: {
      type: Number,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    co: {
      type: String,
      default: "",
    },

    bloomLevel: {
      type: String,
      default: "",
    },

    pi: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;