import axios from "axios";

export const sendEmail = async (email) => {

    return axios.post(

        "http://localhost:5000/api/email/send",

        {

            email

        }

    );

};