import mongoose from "mongoose";

const subQuestionSchema = new mongoose.Schema(
  {
    label: String,
    question: String,
    marks: String,
    co: String,
    bl: String,
    pi: String,
  },
  { _id: false }
);

const optionSchema = new mongoose.Schema(
  {
    question: String,
    marks: String,
    co: String,
    bl: String,
    pi: String,
    subQuestions: [subQuestionSchema],
  },
  { _id: false }
);

const partBItemSchema = new mongoose.Schema(
  {
    qNo: String,
    typeA: String,
    typeB: String,
    optionA: optionSchema,
    optionB: optionSchema,
  },
  { _id: false }
);

const questionPaperSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    subject: { type: String, default: "" },
    collegeName: { type: String, default: "" },
    examName: { type: String, default: "" },
    examMonth: { type: String, default: "" },
    examYear: { type: String, default: "" },
    branch: { type: String, default: "" },
    department: { type: String, default: "" },
    semester: { type: String, default: "" },
    subjectCode: { type: String, default: "" },
    subjectName: { type: String, default: "" },
    regulation: { type: String, default: "" },
    duration: { type: String, default: "" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    maxMarks: { type: String, default: "" },

    partA: [
      {
        qNo: String,
        question: String,
        co: String,
        bl: String,
        pi: String,
      },
    ],
    partB: [partBItemSchema],
    partC: {
      qNo: String,
      optionA: optionSchema,
      optionB: optionSchema,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

export default QuestionPaper;