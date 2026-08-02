import React, { useState } from "react";
import { addQuestion } from "../services/questionAPI";

function QuestionForm({ setQuestions }) {

  const [questionText, setQuestionText] = useState("");
  const [marks, setMarks] = useState("");


  const addQuestionHandler = async () => {

    if (!questionText || !marks) {
      alert("Enter question and marks");
      return;
    }


    const newQuestion = {

      questionPaperId: "YOUR_QUESTION_PAPER_ID",

      questionNumber: Date.now(),

      questionText: questionText,

      marks: Number(marks),

      co: "",

      bloomLevel: "",

      pi: ""

    };


    try {

      const response = await addQuestion(newQuestion);


      setQuestions((prev) => [
        ...prev,
        response.data.data || newQuestion
      ]);


      setQuestionText("");

      setMarks("");


    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="mt-5">

      <input

        className="border p-2 mr-2 w-96"

        placeholder="Enter Question"

        value={questionText}

        onChange={(e) => setQuestionText(e.target.value)}

      />


      <input

        className="border p-2 mr-2 w-24"

        placeholder="Marks"

        type="number"

        value={marks}

        onChange={(e) => setMarks(e.target.value)}

      />


      <button

        onClick={addQuestionHandler}

        className="bg-blue-600 text-white px-4 py-2 rounded"

      >

        Add Question

      </button>


    </div>

  );

}


export default QuestionForm;