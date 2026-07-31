import CourseOutcome from "../models/CourseOutcome.js";


// Create Course Outcome
export const createCourseOutcome = async (req, res) => {
  try {

    const {
      subject,
      coNumber,
      description,
    } = req.body;


    if (!subject || !coNumber || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    const courseOutcome =
      await CourseOutcome.create({
        subject,
        coNumber,
        description,
      });


    res.status(201).json({
      message: "Course Outcome Created Successfully",
      courseOutcome,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// Get All Course Outcomes
export const getCourseOutcomes = async (req, res) => {

  try {

    const outcomes =
      await CourseOutcome.find()
      .populate("subject");


    res.status(200).json(outcomes);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Update Course Outcome
export const updateCourseOutcome = async (req, res) => {

  try {

    const outcome =
      await CourseOutcome.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );


    res.status(200).json({

      message: "Course Outcome Updated Successfully",

      outcome,

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Delete Course Outcome
export const deleteCourseOutcome = async (req, res) => {

  try {

    await CourseOutcome.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({

      message: "Course Outcome Deleted Successfully",

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};