import Semester from "../models/Semester.js";


// Create Semester
export const createSemester = async (req, res) => {
  try {
    const { name, number, department } = req.body;

    if (!name || !number || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const semester = await Semester.create({
      name,
      number,
      department,
    });

    res.status(201).json({
      message: "Semester Created Successfully",
      semester,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Semesters
export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find()
      .populate("department");

    res.status(200).json(semesters);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Semester
export const updateSemester = async (req, res) => {
  try {

    const semester = await Semester.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Semester Updated Successfully",
      semester,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Semester
export const deleteSemester = async (req, res) => {
  try {

    await Semester.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Semester Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};