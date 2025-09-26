import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const accountEmail = "nihalsheikh585@gmail.com";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: accountEmail,
		pass: EMAIL_PASSWORD,
	},
});

transporter
	.verify()
	.then(() => console.log("Gmail SMTP connection verified"))
	.catch((error) => console.error("Gmail SMTP error:", error));

export default transporter;
