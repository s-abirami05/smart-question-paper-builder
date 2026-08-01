const mongoose = require("mongoose");

const subjectKeywordSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: true,
    },

    keyword: {
      type: String,
      required: true,
      trim: true,
    },

    co: {
      type: String,
      required: true,
    },

    bloomLevel: {
      type: String,
      required: true,
    },

    pi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SubjectKeyword",
  subjectKeywordSchema
);