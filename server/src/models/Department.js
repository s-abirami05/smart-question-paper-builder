import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema(

{
    name:{
        type:String,
        default:"Information Technology"
    },

    code:{
        type:String,
        default:"IT"
    }

},

{
    timestamps:true
}

);


const Department = mongoose.model(
    "Department",
    departmentSchema
);


export default Department;