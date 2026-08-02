import React, { useState } from "react";
import axios from "axios";
import QuestionTable from "../components/QuestionTable";
import QuestionForm from "../components/QuestionForm";

function QuestionBuilder() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSavePaper = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/question/create-paper",
        {
          title,
          subject,
          semester,
          questions,
        }
      );

      alert("Question Paper Saved Successfully!");

      console.log(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to save Question Paper");

    }

  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Question Paper Builder
      </h1>

      <input
        type="text"
        placeholder="Question Paper Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Subject"
        className="border p-2 mb-2 w-full"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="text"
        placeholder="Semester"
        className="border p-2 mb-4 w-full"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />

      <QuestionForm setQuestions={setQuestions} />

      <QuestionTable
        questions={questions}
        setQuestions={setQuestions}
      />

      <button
        onClick={handleSavePaper}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Question Paper
      </button>

    </div>
  );
}

export default QuestionBuilder;