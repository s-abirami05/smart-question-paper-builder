import mongoose from "mongoose";


const semesterSchema = new mongoose.Schema(

{

    name: {

        type: String,

        required: true,

        unique: true,

        trim: true

    }

},

{
    timestamps:true
}

);


const Semester = mongoose.model(
    "Semester",
    semesterSchema
);


export default Semester;