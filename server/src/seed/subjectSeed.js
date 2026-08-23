import mongoose from "mongoose";
import dotenv from "dotenv";

import Subject from "../models/Subject.js";
import Department from "../models/Department.js";
import Semester from "../models/Semester.js";


dotenv.config();



const subjectData = [

    // =====================
    // Semester 1
    // =====================

    {
        name: "Engineering Mathematics I",
        code: "MA3151",
        credits: 4,
        semester: "Semester 1"
    },

    {
        name: "Engineering Physics",
        code: "PH3151",
        credits: 3,
        semester: "Semester 1"
    },

    {
        name: "Engineering Chemistry",
        code: "CY3151",
        credits: 3,
        semester: "Semester 1"
    },

    {
        name: "Problem Solving and Python Programming",
        code: "GE3151",
        credits: 3,
        semester: "Semester 1"
    },

    {
        name: "Engineering Graphics",
        code: "GE3152",
        credits: 4,
        semester: "Semester 1"
    },

    {
        name: "Heritage of Tamils",
        code: "HS3151",
        credits: 1,
        semester: "Semester 1"
    },



    // =====================
    // Semester 2
    // =====================


    {
        name: "Engineering Mathematics II",
        code: "MA3251",
        credits: 4,
        semester: "Semester 2"
    },
<<<<<<< HEAD


=======
    
>>>>>>> 94faacadaa7da0ee10c39109a0d0bb902cd24045
    {
        name: "Physics for Information Science",
        code: "PH3256",
        credits: 3,
        semester: "Semester 2"
    },


    {
        name: "Data Structures",
        code: "AD3251",
        credits: 4,
        semester: "Semester 2"
    },


    {
        name: "Programming in C",
        code: "CS3251",
        credits: 3,
        semester: "Semester 2"
    },


    {
        name: "Digital Principles and System Design",
        code: "CS3252",
        credits: 3,
        semester: "Semester 2"
    },



    // =====================
    // Semester 3
    // =====================


    {
        name: "Discrete Mathematics",
        code: "MA3354",
        credits: 4,
        semester: "Semester 3"
    },


    {
        name: "Object Oriented Programming",
        code: "CS3353",
        credits: 3,
        semester: "Semester 3"
    },


    {
        name: "Computer Organization and Architecture",
        code: "CS3352",
        credits: 3,
        semester: "Semester 3"
    },


    {
        name: "Database Management Systems",
        code: "CS3351",
        credits: 3,
        semester: "Semester 3"
    },


    {
        name: "Operating Systems",
        code: "CS3491",
        credits: 3,
        semester: "Semester 3"
    },



    // =====================
    // Semester 4
    // =====================


    {
        name: "Design and Analysis of Algorithms",
        code: "CS3591",
        credits: 4,
        semester: "Semester 4"
    },


    {
        name: "Computer Networks",
        code: "CS3592",
        credits: 3,
        semester: "Semester 4"
    },


    {
        name: "Software Engineering",
        code: "CS3691",
        credits: 3,
        semester: "Semester 4"
    },


    {
        name: "Web Technologies",
        code: "IT3401",
        credits: 3,
        semester: "Semester 4"
    },


    {
        name: "Environmental Science and Sustainability",
        code: "GE3451",
        credits: 2,
        semester: "Semester 4"
    },



    // =====================
    // Semester 5
    // =====================


    {
        name: "Artificial Intelligence",
        code: "CS3491",
        credits: 3,
        semester: "Semester 5"
    },


    {
        name: "Machine Learning",
        code: "CS3691",
        credits: 3,
        semester: "Semester 5"
    },


    {
        name: "Internet Programming",
        code: "IT3501",
        credits: 3,
        semester: "Semester 5"
    },


    {
        name: "Mobile Computing",
        code: "IT3551",
        credits: 3,
        semester: "Semester 5"
    },



    // =====================
    // Semester 6
    // =====================


    {
        name: "Cloud Computing",
        code: "IT3601",
        credits: 3,
        semester: "Semester 6"
    },


    {
        name: "Cyber Security",
        code: "CS3692",
        credits: 3,
        semester: "Semester 6"
    },


    {
        name: "Data Analytics",
        code: "IT3602",
        credits: 3,
        semester: "Semester 6"
    },



    // =====================
    // Semester 7
    // =====================


    {
        name: "Professional Elective I",
        code: "PE1",
        credits: 3,
        semester: "Semester 7"
    },


    {
        name: "Professional Elective II",
        code: "PE2",
        credits: 3,
        semester: "Semester 7"
    },


    {
        name: "Project Work Phase I",
        code: "IT3711",
        credits: 2,
        semester: "Semester 7"
    },



    // =====================
    // Semester 8
    // =====================


    {
        name: "Professional Elective III",
        code: "PE3",
        credits: 3,
        semester: "Semester 8"
    },


    {
        name: "Project Work Phase II",
        code: "IT3811",
        credits: 10,
        semester: "Semester 8"
    }


];





const importSubjects = async()=>{


    try{


        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log("MongoDB Connected");



        const department =
        await Department.findOne({

            code:"IT"

        });



        if(!department){

            console.log(
                "IT Department Not Found"
            );

            process.exit();

        }




        for(const item of subjectData){


            const semester =
            await Semester.findOne({

                name:item.semester

            });



            if(!semester){

                console.log(
                    `${item.semester} not found`
                );

                continue;

            }




            const exists =
            await Subject.findOne({

                code:item.code

            });



            if(exists){

                console.log(
                    `${item.code} already exists`
                );

                continue;

            }




            await Subject.create({

                name:item.name,

                code:item.code,

                credits:item.credits,

                department:department._id,

                semester:semester._id

            });



            console.log(
                `${item.name} added`
            );


        }




        console.log(
            "All Subjects Imported Successfully"
        );


        process.exit();



    }
    catch(error){


        console.log(error.message);

        process.exit();


    }


};




importSubjects();