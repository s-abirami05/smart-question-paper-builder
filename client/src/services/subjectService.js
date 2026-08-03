import axios from "axios";


const API_URL = "http://localhost:5000/api/subjects";


// Get all subjects
export const getSubjects = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};



// Get subjects by semester
export const getSubjectsBySemester = async (semesterId) => {

    const response = await axios.get(
        `${API_URL}/semester/${semesterId}`
    );

    return response.data;

};