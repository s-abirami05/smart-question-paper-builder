import Subject from "../models/Subject.js";


// Create Subject
export const createSubject = async (req, res) => {
  try {
    const {
      name,
      code,
      department,
      semester,
      credits,
    } = req.body;


    if (
      !name ||
      !code ||
      !department ||
      !semester ||
      !credits
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    const existingSubject = await Subject.findOne({
      code,
    });


    if (existingSubject) {
      return res.status(400).json({
        message: "Subject already exists",
      });
    }


    const subject = await Subject.create({
      name,
      code,
      department,
      semester,
      credits,
    });


    res.status(201).json({
      message: "Subject Created Successfully",
      subject,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// Get All Subjects
export const getSubjects = async (req, res) => {

  try {

    const subjects = await Subject.find()
      .populate("department")
      .populate("semester");


    res.status(200).json(subjects);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Update Subject
export const updateSubject = async (req, res) => {

  try {

    const subject =
      await Subject.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );


    res.status(200).json({

      message: "Subject Updated Successfully",

      subject,

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Delete Subject
export const deleteSubject = async (req, res) => {

  try {

    await Subject.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({

      message: "Subject Deleted Successfully",

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};