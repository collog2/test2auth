import db from "../../models/index.js";

const User = db.user;
const Otp = db.otp;

const verifyController = async (req, res) => {
	const { code, email } = req.body;

	const otpRecord = await Otp.findOne({ where: { code, email } });
	if (!otpRecord) {
		return res
			.status(404)
			.json({ success: false, data: { message: "invalid OTP" } });
	}

	const now = new Date().getTime();
	const expireDate = new Date(otpRecord.expires).getTime();
	if (now > expireDate) {
		return res
			.status(400)
			.json({ success: false, data: { message: "OTP expired" } });
	}

	await User.update({ canResetPassword: true }, { where: { email } });
	await Otp.destroy({ where: { id: otpRecord.id } });

	return res
		.status(201)
		.json({ success: true, data: { message: "OTP verified" } });
};

export default verifyController;
