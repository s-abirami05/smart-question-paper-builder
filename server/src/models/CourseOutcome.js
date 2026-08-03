import mongoose from "mongoose";


const courseOutcomeSchema = new mongoose.Schema(
  {

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },


    coNumber: {
      type: String,
      required: true,
      trim: true,
    },


    description: {
      type: String,
      required: true,
      trim: true,
    }

  },
  {
    timestamps: true,
  }
);



const CourseOutcome = mongoose.model(
  "CourseOutcome",
  courseOutcomeSchema
);



export default CourseOutcome;