import Syllabus from "../models/Syllabus.js";



// Upload Syllabus PDF

export const uploadSyllabus = async(req,res)=>{


    try{


        const {subject} = req.body;



        if(!subject){

            return res.status(400).json({

                message:"Subject is required"

            });

        }




        if(!req.file){

            return res.status(400).json({

                message:"PDF file is required"

            });

        }





        const syllabus = await Syllabus.create({

            subject,

            fileName:req.file.originalname,

            filePath:req.file.path

        });





        res.status(201).json({

            message:"Syllabus Uploaded Successfully",

            syllabus

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Get Syllabus by Subject

export const getSyllabus = async(req,res)=>{


    try{


        const {subjectId}=req.params;



        const syllabus = await Syllabus.find({

            subject:subjectId

        })
        .populate("subject");




        res.status(200).json(syllabus);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};