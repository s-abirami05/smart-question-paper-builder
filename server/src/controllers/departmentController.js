import Department from "../models/Department.js";



// Add Department

export const addDepartment = async(req,res)=>{


    try{


        const {name}=req.body;


        if(!name){

            return res.status(400).json({
                message:"Department name required"
            });

        }



        const department = await Department.create({

            name

        });



        res.status(201).json({

            message:"Department Added Successfully",

            department

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};




// Get All Departments


export const getDepartments = async(req,res)=>{


    try{


        const departments = await Department.find();


        res.status(200).json(

            departments

        );


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};




// Delete Department


export const deleteDepartment = async(req,res)=>{


    try{


        await Department.findByIdAndDelete(req.params.id);


        res.json({

            message:"Department Deleted"

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};