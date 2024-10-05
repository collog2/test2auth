import db from "../../models/index.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const Otp = db.otp;
const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD } = dotenv.config().parsed;

const generateOTP = () => Math.round(Math.random() * 10000);

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: ADMIN_EMAIL,
		pass: ADMIN_EMAIL_PASSWORD,
	},
});

const sendOTPEmail = (email, code) => {
	const mailOptions = {
		from: ADMIN_EMAIL,
		to: email,
		subject: "Password Reset OTP",
		text: `Your OTP for password reset is ${code}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

const forgetController = async (req, res) => {
	if (!req.user) {
		return res.status(404).json({
			success: false,
			data: { message: "email isn't registered" },
		});
	}
	const user = req.user;
	const code = generateOTP();
	const expires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

	const otp = await Otp.create({ email: req.user.email, code, expires });

	sendOTPEmail(user.email, code);

	return res
		.status(201)
		.json({ success: true, data: { message: "OTP sent to email" } });
};

export default forgetController;
