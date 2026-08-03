import CourseOutcome from "../models/CourseOutcome.js";


// Create Course Outcome

export const createCourseOutcome = async (req, res) => {

    try {

        const {
            subject,
            coNumber,
            description
        } = req.body;


        if(!subject || !coNumber || !description){

            return res.status(400).json({
                message:"All fields are required"
            });

        }


        const existingCO = await CourseOutcome.findOne({
            subject,
            coNumber
        });


        if(existingCO){

            return res.status(400).json({
                message:"Course Outcome already exists"
            });

        }



        const courseOutcome = await CourseOutcome.create({

            subject,
            coNumber,
            description

        });



        res.status(201).json({

            message:"Course Outcome Created Successfully",

            courseOutcome

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};





// Get CO by Subject

export const getCourseOutcomes = async (req,res)=>{


    try{


        const {subjectId} = req.params;


        const courseOutcomes = await CourseOutcome.find({

            subject:subjectId

        })
        .populate("subject");



        res.status(200).json(courseOutcomes);



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};





// Update CO

export const updateCourseOutcome = async(req,res)=>{


    try{


        const courseOutcome = await CourseOutcome.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.status(200).json({

            message:"Course Outcome Updated Successfully",

            courseOutcome

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};





// Delete CO

export const deleteCourseOutcome = async(req,res)=>{


    try{


        await CourseOutcome.findByIdAndDelete(

            req.params.id

        );


        res.status(200).json({

            message:"Course Outcome Deleted Successfully"

        });



    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};