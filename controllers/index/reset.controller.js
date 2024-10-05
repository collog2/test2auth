import db from "../../models/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const saltRounds = dotenv.config().parsed.BC_SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);
const User = db.user;

const resetController = async (req, res) => {
	const { email, password } = req.body;

	let user;
	try {
		user = await User.findOne({ where: { email } });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	if (!user) {
		return res
			.status(404)
			.json({ success: false, data: { message: "user not found" } });
	}
	if (!user.canResetPassword) {
		return res.status(403).json({
			success: false,
			data: { message: "not authorized to reset password" },
		});
	}

	const passwordHash = bcrypt.hashSync(password, salt);
	await User.update(
		{ password: passwordHash, canResetPassword: false },
		{ where: { id: user.id } }
	);

	return res.status(201).json({
		success: true,
		data: { message: "Password reset successfully" },
	});
};

export default resetController;
