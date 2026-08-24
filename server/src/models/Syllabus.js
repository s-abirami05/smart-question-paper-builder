import mongoose from "mongoose";


const syllabusSchema = new mongoose.Schema(

{

    subject:{

        type: mongoose.Schema.Types.ObjectId,

        ref:"Subject",

        required:true

    },


    fileName:{

        type:String,

        required:true

    },


    filePath:{

        type:String,

        required:true

    }

},

{
    timestamps:true
}

);



const Syllabus = mongoose.model(
    "Syllabus",
    syllabusSchema
);



export default Syllabus;