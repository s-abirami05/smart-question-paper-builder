import { useEffect, useState } from "react";
import axios from "axios";


function CourseOutcome() {


    const [subjects, setSubjects] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState("");

    const [coNumber, setCoNumber] = useState("");

    const [description, setDescription] = useState("");

    const [courseOutcomes, setCourseOutcomes] = useState([]);



    // Load Subjects

    useEffect(()=>{

        loadSubjects();

    },[]);





    const loadSubjects = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/subjects"
            );


            setSubjects(response.data);


        }
        catch(error){

            console.log(error);

        }

    };





    // Get CO by Subject

    const getCOs = async(subjectId)=>{


        try{


            const response = await axios.get(

                `http://localhost:5000/api/course-outcomes/subject/${subjectId}`

            );


            setCourseOutcomes(response.data);


        }
        catch(error){

            console.log(error);

        }


    };







    const handleSubjectChange = (e)=>{


        const id = e.target.value;


        setSelectedSubject(id);


        if(id){

            getCOs(id);

        }
        else{

            setCourseOutcomes([]);

        }


    };







    // Add CO

    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            await axios.post(

                "http://localhost:5000/api/course-outcomes",

                {

                    subject:selectedSubject,

                    coNumber,

                    description

                }

            );



            alert("CO Added Successfully");



            setCoNumber("");

            setDescription("");



            getCOs(selectedSubject);



        }
        catch(error){

            console.log(error);

        }


    };







    return (

        <div className="min-h-screen bg-gray-100 p-10">


            <h1 className="text-4xl font-bold text-center mb-10">

                Course Outcome Management

            </h1>





            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">





                <label className="font-semibold">

                    Select Subject

                </label>



                <select

                    value={selectedSubject}

                    onChange={handleSubjectChange}

                    className="w-full border p-3 rounded mt-2 mb-5"

                >


                    <option value="">

                        Select Subject

                    </option>


                    {
                        subjects.map((sub)=>(


                            <option

                                key={sub._id}

                                value={sub._id}

                            >

                                {sub.name}

                            </option>


                        ))
                    }



                </select>







                <form onSubmit={handleSubmit}>


                    <label className="font-semibold">

                        CO Number

                    </label>


                    <input

                        value={coNumber}

                        onChange={(e)=>setCoNumber(e.target.value)}

                        placeholder="CO1"

                        className="w-full border p-3 rounded mt-2 mb-5"

                    />





                    <label className="font-semibold">

                        Description

                    </label>


                    <textarea

                        value={description}

                        onChange={(e)=>setDescription(e.target.value)}

                        placeholder="Enter CO Description"

                        className="w-full border p-3 rounded mt-2 mb-5"

                    />





                    <button

                        className="bg-blue-600 text-white px-6 py-3 rounded"

                    >

                        Add CO

                    </button>



                </form>



            </div>







            <div className="max-w-xl mx-auto mt-10">


                <h2 className="text-2xl font-bold mb-5">

                    CO List

                </h2>



                {
                    courseOutcomes.map((co)=>(


                        <div

                            key={co._id}

                            className="bg-white p-5 rounded shadow mb-3"

                        >

                            <h3 className="font-bold text-xl">

                                {co.coNumber}

                            </h3>


                            <p>

                                {co.description}

                            </p>


                        </div>


                    ))
                }



            </div>



        </div>

    );

}


export default CourseOutcome;