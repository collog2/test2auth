import db from "../models/index.js";
const User = db.user;

const userValidate = async (req, res, next) => {
	const { email } = req.body;

	let user;
	try {
		user = await User.findOne({ where: { email }, raw: true });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	req["user"] = user;

	next();
};

export default userValidate;
