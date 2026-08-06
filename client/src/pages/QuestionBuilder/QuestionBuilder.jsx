import { useState } from "react";


function QuestionBuilder() {


  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [marks, setMarks] = useState("");



  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold text-center mb-10">
        Create Question Paper Builder
      </h1>



      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">



        {/* Department */}

        <label className="block font-semibold mb-2">
          Select Department
        </label>

        <select

          value={department}

          onChange={(e)=>setDepartment(e.target.value)}

          className="w-full border p-3 rounded mb-5"

        >

          <option value="">
            Select Department
          </option>

          <option>
            CSE
          </option>

          <option>
            IT
          </option>

          <option>
            ECE
          </option>

        </select>




        {/* Semester */}

        <label className="block font-semibold mb-2">
          Select Semester
        </label>


        <select

          value={semester}

          onChange={(e)=>setSemester(e.target.value)}

          className="w-full border p-3 rounded mb-5"

        >

          <option value="">
            Select Semester
          </option>

          <option>
            Semester 1
          </option>

          <option>
            Semester 2
          </option>

          <option>
            Semester 3
          </option>


        </select>




        {/* Subject */}

        <label className="block font-semibold mb-2">
          Select Subject
        </label>


        <input

          type="text"

          value={subject}

          onChange={(e)=>setSubject(e.target.value)}

          placeholder="Enter Subject Name"

          className="w-full border p-3 rounded mb-5"

        />




        {/* Exam Type */}

        <label className="block font-semibold mb-2">
          Exam Type
        </label>


        <select

          value={examType}

          onChange={(e)=>setExamType(e.target.value)}

          className="w-full border p-3 rounded mb-5"

        >

          <option value="">
            Select Exam Type
          </option>

          <option>
            Internal Exam
          </option>

          <option>
            Model Exam
          </option>

          <option>
            Semester Exam
          </option>


        </select>




        {/* Marks */}

        <label className="block font-semibold mb-2">
          Total Marks
        </label>


        <input

          type="number"

          value={marks}

          onChange={(e)=>setMarks(e.target.value)}

          placeholder="Enter Total Marks"

          className="w-full border p-3 rounded mb-6"

        />




        <button

          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"

        >

          Generate Question Paper

        </button>



      </div>



    </div>

  );

}


export default QuestionBuilder;