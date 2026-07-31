import multer from "multer";
import path from "path";


// Storage Configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "src/uploads/syllabus");
  },


  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  },

});


// File Filter (PDF Only)
const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "application/pdf"
  ) {

    cb(null, true);

  } else {

    cb(
      new Error("Only PDF files are allowed"),
      false
    );

  }

};


const upload = multer({

  storage,

  fileFilter,

});


export default upload;