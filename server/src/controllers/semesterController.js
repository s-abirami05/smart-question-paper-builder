import Semester from "../models/Semester.js";


// Add Semester

export const addSemester = async (req, res) => {

    try {

        const { name } = req.body;


        if (!name) {

            return res.status(400).json({
                message: "Semester name is required"
            });

        }


        const semester = await Semester.create({

            name

        });


        res.status(201).json({

            message: "Semester Added Successfully",

            semester

        });


    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





// Get All Semesters

export const getSemesters = async (req, res) => {

    try {


        const semesters = await Semester.find();


        res.status(200).json(

            semesters

        );


    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





// Delete Semester

export const deleteSemester = async (req, res) => {


    try {


        await Semester.findByIdAndDelete(req.params.id);


        res.status(200).json({

            message: "Semester Deleted Successfully"

        });


    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};