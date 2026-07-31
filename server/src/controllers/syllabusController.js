import Syllabus from "../models/Syllabus.js";


// Upload Syllabus PDF
export const uploadSyllabus = async (req, res) => {
  try {

    const { subject } = req.body;


    if (!subject) {
      return res.status(400).json({
        message: "Subject is required",
      });
    }


    if (!req.file) {
      return res.status(400).json({
        message: "Please upload syllabus PDF",
      });
    }


    const syllabus = await Syllabus.create({

      subject,

      fileName: req.file.originalname,

      filePath: req.file.path,

      uploadedBy: req.user._id,

    });


    res.status(201).json({

      message: "Syllabus Uploaded Successfully",

      syllabus,

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};



// Get All Syllabus
export const getSyllabus = async (req, res) => {

  try {

    const syllabus =
      await Syllabus.find()
      .populate("subject")
      .populate("uploadedBy", "name email");


    res.status(200).json(syllabus);


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};