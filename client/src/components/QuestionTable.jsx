import React from "react";
import { deleteQuestion as deleteQuestionAPI, updateQuestion } from "../services/questionAPI";

function QuestionTable({ questions, setQuestions }) {


const deleteQuestion = async (index) => {

  try {

    console.log("Selected Question:", questions[index]);

    const id = questions[index]._id;

    console.log("Question ID:", id);

    if(!id){
      alert("Question ID missing");
      return;
    }

    await deleteQuestionAPI(id);

    const updatedQuestions = questions.filter(
      (_, i) => i !== index
    );

    setQuestions(updatedQuestions);

  } catch(error){

    console.log(error);

  }

};


  const editQuestion = (index) => {

    const updatedText = prompt(
      "Edit Question",
      questions[index].questionText
    );


    if(updatedText){

      const updatedQuestions = [...questions];

      const editQuestion = async(index)=>{

 const updatedText = prompt(
 "Edit Question",
 questions[index].questionText
 );


 if(updatedText){

   const id = questions[index]._id;


   await updateQuestion(id,{
     questionText: updatedText
   });


   const updatedQuestions=[...questions];

   updatedQuestions[index].questionText = updatedText;

   setQuestions(updatedQuestions);

 }

};
      setQuestions(updatedQuestions);

    }

  };


  return (

    <div className="mt-6">

      <table className="w-full border-collapse border">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">No</th>

            <th className="border p-2">Question</th>

            <th className="border p-2">Marks</th>

            <th className="border p-2">CO</th>

            <th className="border p-2">Bloom Level</th>

            <th className="border p-2">PI</th>

            <th className="border p-2">Action</th>

          </tr>

        </thead>


        <tbody>

        {
          questions.map((q,index)=>(

           <tr key={q._id || index}>

              <td className="border p-2 text-center">
                {index+1}
              </td>


              <td className="border p-2">
                {q.questionText}
              </td>


              <td className="border p-2 text-center">
                {q.marks}
              </td>


              <td className="border p-2">
                {q.co || "-"}
              </td>


              <td className="border p-2">
                {q.bloomLevel || "-"}
              </td>


              <td className="border p-2">
                {q.pi || "-"}
              </td>


              <td className="border p-2">


                <button

                onClick={()=>editQuestion(index)}

                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"

                >
                  Edit
                </button>


                <button

                onClick={()=>deleteQuestion(index)}

                className="bg-red-500 text-white px-3 py-1 rounded"

                >
                  Delete
                </button>


              </td>


            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  );

}


export default QuestionTable;