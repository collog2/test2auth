import db from "../../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const { JWT_SECRET, JWT_EXPIRES_IN } = dotenv.config().parsed;
const saltRounds = dotenv.config().parsed.BC_SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);
const User = db.user;

const signupController = async (req, res) => {
	if (req.user) {
		return res.status(409).json({
			success: false,
			data: { message: "email is already taken" },
		});
	}

	const { email, name, password, rememberMe } = req.body;
	const passwordHash = bcrypt.hashSync(password, salt);

	let user = await User.create(
		{ email, name, password: passwordHash },
		{ raw: true }
	);

	delete user.password;

	let token;
	try {
		token = jwt.sign(user, JWT_SECRET, {
			expiresIn: rememberMe ? JWT_EXPIRES_IN : "90d",
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	return res.status(201).json({ success: true, data: { user, token } });
};

export default signupController;
