import mongoose from "mongoose";

const questionPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    department: {
      type: String,
    },

    questions: [
      {
        questionText: {
          type: String,
        },

        questionNumber: {
          type: Number,
        },

        marks: {
          type: Number,
        },

        co: {
          type: String,
        },

        bloomLevel: {
          type: String,
        },

        pi: {
          type: String,
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);


const QuestionPaper = mongoose.model(
  "QuestionPaper",
  questionPaperSchema
);


export default QuestionPaper;