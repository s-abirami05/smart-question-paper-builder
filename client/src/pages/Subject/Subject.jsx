import { useEffect, useState } from "react";
import axios from "axios";
import { getSemesters } from "../../services/semesterService";

function Subject() {


    const [semester, setSemester] = useState("");

    const [subjects, setSubjects] = useState([]);




    const semesters = [
        {
            id: "6a6ce75b8c8bd8daccda9050",
            name: "Semester 1"
        },
        {
            id: "SEM2",
            name: "Semester 2"
        },
        {
            id: "SEM3",
            name: "Semester 3"
        },
        {
            id: "SEM4",
            name: "Semester 4"
        },
        {
            id: "SEM5",
            name: "Semester 5"
        },
        {
            id: "SEM6",
            name: "Semester 6"
        },
        {
            id: "SEM7",
            name: "Semester 7"
        },
        {
            id: "SEM8",
            name: "Semester 8"
        }
    ];





    const getSubjects = async(id)=>{


        try{


            const response = await axios.get(
                `http://localhost:5000/api/subjects/semester/${id}`
            );


            setSubjects(response.data);



        }
        catch(error){

            console.log(error);

        }


    };






    const handleSemesterChange = (e)=>{


        const id = e.target.value;


        setSemester(id);


        if(id){

            getSubjects(id);

        }
        else{

            setSubjects([]);

        }


    };




    const loadSemesters = async()=>{

    try{

        const data = await getSemesters();

        setSemesters(data);

    }
    catch(error){

        console.log(error);

    }

};






    return (

        <div className="min-h-screen bg-gray-100 p-10">


            <h1 className="text-4xl font-bold text-center mb-10">

                Subject Management

            </h1>




            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">



                <label className="font-semibold">

                    Department

                </label>


                <input

                    value="Information Technology"

                    disabled

                    className="w-full border p-3 rounded mt-2 mb-5 bg-gray-200"

                />





                <label className="font-semibold">

                    Select Semester

                </label>



                <select

                    value={semester}

                    onChange={handleSemesterChange}

                    className="w-full border p-3 rounded mt-2"

                >

                    <option value="">
                        Select Semester
                    </option>


                    {
                        semesters.map((sem)=>(

                            <option 
                                key={sem.id}
                                value={sem.id}
                            >

                                {sem.name}

                            </option>

                        ))
                    }


                </select>



            </div>






            <div className="max-w-xl mx-auto mt-10">


                <h2 className="text-2xl font-bold mb-5">

                    Subjects

                </h2>



                {
                    subjects.map((sub)=>(


                        <div

                            key={sub._id}

                            className="bg-white p-5 rounded shadow mb-3"

                        >

                            <h3 className="text-xl font-bold">

                                {sub.name}

                            </h3>


                            <p>

                                Code : {sub.code}

                            </p>


                            <p>

                                Credits : {sub.credits}

                            </p>


                        </div>


                    ))
                }



            </div>



        </div>


    );

}


export default Subject;