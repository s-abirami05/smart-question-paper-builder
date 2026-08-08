import QuestionPaper from "../models/QuestionPaper.js";
import Question from "../models/Question.js";

export const createQuestionPaper = async (req, res) => {
  try {

    const { title, subject, semester } = req.body;

    const newPaper = new QuestionPaper({
      title,
      subject,
      semester,
      questions: []
    });

    await newPaper.save();

    res.status(201).json({
      success: true,
      message: "Question Paper Saved Successfully",
      data: newPaper
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
export const addQuestion = async (req, res) => {
  try {

    const {
      questionPaperId,
      questionNumber,
      questionText,
      marks
    } = req.body;


    const question = new Question({
      questionPaperId,
      questionNumber,
      questionText,
      marks
    });


    await question.save();


    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      data: question
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
export const getQuestions = async (req, res) => {
  try {

    const { questionPaperId } = req.params;

    const questions = await Question.find({
      questionPaperId
    });

    res.status(200).json({
      success: true,
      data: questions
    });

  } catch(error){

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
export const updateQuestion = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true
      }
    );

    if (!updatedQuestion) {
  return res.status(404).json({
    success: false,
    message: "Question not found"
  });
}

    res.status(200).json({
      success: true,
      message: "Question Updated Successfully",
      data: updatedQuestion
    });

  } catch(error){

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
export const deleteQuestion = async (req, res) => {
  try {

    const { id } = req.params;

    await Question.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question Deleted Successfully"
    });

  } catch(error){

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
export const createQuestion = async (req,res)=>{

 try{

   const question = await Question.create(req.body);


   res.status(201).json({

    success:true,

    data:question

   });


 }catch(error){

   res.status(500).json({

    success:false,

    message:error.message

   });

 }

};
export const createPaper = async(req,res)=>{

 try{

  const paper = await QuestionPaper.create(req.body);


  res.status(201).json({

    success:true,

    data:paper

  });


 }
 catch(error){

  res.status(500).json({

    success:false,

    message:error.message

  });

 }

};