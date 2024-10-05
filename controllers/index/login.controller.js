import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const { JWT_SECRET, JWT_EXPIRES_IN } = dotenv.config().parsed;

const loginController = async (req, res) => {
	const { password } = req.body;
	const { user } = req.user;

	if (!bcrypt.compareSync(password, user.password)) {
		return res
			.status(401)
			.json({ success: false, data: { message: "wrong password." } });
	}

	delete user.password;

	let token;
	try {
		token = jwt.sign(user, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	return res.status(200).json({ success: true, data: { user, token } });
};

export default loginController;
