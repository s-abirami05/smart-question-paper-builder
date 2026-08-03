import React from "react";

function QuestionTable({ questions, setQuestions }) {


  const deleteQuestion = (index) => {

    const updatedQuestions = questions.filter(
      (_, i) => i !== index
    );

    setQuestions(updatedQuestions);

  };


  return (

    <div className="mt-6">

      <table className="w-full border-collapse border">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">
              No
            </th>

            <th className="border p-2">
              Question
            </th>

            <th className="border p-2">
              Marks
            </th>

            <th className="border p-2">
              CO
            </th>

            <th className="border p-2">
              Bloom's Level
            </th>

            <th className="border p-2">
              PI
            </th>

            <th className="border p-2">
              Action
            </th>

          </tr>

        </thead>


        <tbody>


          {
            questions.length === 0 ? (

              <tr>

                <td 
                  colSpan="7"
                  className="border p-3 text-center"
                >
                  No Questions Added
                </td>

              </tr>

            ) : (

              questions.map((q,index)=>(

                <tr key={index}>


                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>


                  <td className="border p-2">
                    {q.questionText}
                  </td>


                  <td className="border p-2 text-center">
                    {q.marks}
                  </td>


                  <td className="border p-2 text-center">
                    {q.co || "-"}
                  </td>


                  <td className="border p-2 text-center">
                    {q.bloomLevel || "-"}
                  </td>


                  <td className="border p-2 text-center">
                    {q.pi || "-"}
                  </td>


                  <td className="border p-2 text-center">


                    <button

                      onClick={() => deleteQuestion(index)}

                      className="bg-red-500 text-white px-3 py-1 rounded"

                    >
                      Delete
                    </button>


                  </td>


                </tr>

              ))

            )
          }


        </tbody>


      </table>


    </div>

  );

}


export default QuestionTable;