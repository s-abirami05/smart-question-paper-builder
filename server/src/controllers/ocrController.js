import Tesseract from "tesseract.js";
import pdf from "pdf-poppler";
import path from "path";
import fs from "fs";


export const processOCR = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success:false,
        message:"No file uploaded"
      });

    }


    let extractedText = "";


    // IMAGE FILE
    if (
      req.file.mimetype === "image/png" ||
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg"
    ) {


      const result = await Tesseract.recognize(

        req.file.path,

        "eng"

      );


      extractedText = result.data.text;


    }


    // PDF FILE
    else if (req.file.mimetype === "application/pdf") {


      const outputFolder = "uploads/images";


      if (!fs.existsSync(outputFolder)) {

        fs.mkdirSync(outputFolder);

      }


      await pdf.convert(

        req.file.path,

        {

          format:"png",

          out_dir:outputFolder,

          out_prefix:"page",

          page:null

        }

      );


      const images = fs.readdirSync(outputFolder);


      for (const image of images) {


        const result = await Tesseract.recognize(

          path.join(outputFolder,image),

          "eng"

        );


        extractedText += result.data.text + "\n";


      }


    }


    else {

      return res.status(400).json({

        success:false,

        message:"Only PDF or Image allowed"

      });

    }



    res.json({

      success:true,

      message:"OCR completed successfully",

      text: extractedText

    });



  } catch(error) {


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};