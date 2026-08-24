import mongoose from "mongoose";

// Diagram-ற்கான Sub-Schema
const diagramSchema = new mongoose.Schema(
  {
    boxes: [
      {
        x: Number,
        y: Number,
        w: Number,
        h: Number,
        text: String,
      },
    ],
    arrows: [
      {
        x1: Number,
        y1: Number,
        x2: Number,
        y2: Number,
      },
    ],
    texts: [
      {
        x: Number,
        y: Number,
        text: String,
      },
    ],
  },
  { _id: false }
);

// Sub-question Schema
const subQuestionSchema = new mongoose.Schema(
  {
    label: String,
    question: String,
    marks: String,
    co: String,
    bl: String,
    pi: String,
    diagram: { type: diagramSchema, default: null },
  },
  { _id: false }
);

// Option Schema
const optionSchema = new mongoose.Schema(
  {
    question: String,
    marks: String,
    co: String,
    bl: String,
    pi: String,
    diagram: { type: diagramSchema, default: null },
    subQuestions: [subQuestionSchema],
  },
  { _id: false }
);

// Part B Question Schema
const partBItemSchema = new mongoose.Schema(
  {
    qNo: String,
    typeA: { type: String, default: "single" },
    typeB: { type: String, default: "single" },
    optionA: optionSchema,
    optionB: optionSchema,
  },
  { _id: false }
);

// Main Question Paper Schema
const questionPaperSchema = new mongoose.Schema(
  {
    collegeName: String,
    examName: String,
    examMonth: String,
    examYear: String,
    branch: String,
    section: String,
    semester: String,
    subjectCode: String,
    subjectName: String,
    regulation: String,
    duration: String,
    date: String,
    time: String,
    maxMarks: String,
    partA: Array,
    partB: [partBItemSchema],
    partC: Object,
  },
  { timestamps: true }
);

export default mongoose.model("QuestionPaper", questionPaperSchema);