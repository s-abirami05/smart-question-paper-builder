import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: "YOUR_EMAIL@gmail.com",

        pass: "YOUR_APP_PASSWORD"

    }

});

export default transporter;