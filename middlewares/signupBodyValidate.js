const signupBodyValidate = (req, res, next) => {
	const { email, password, name } = req.body;
	if (!email || !password || !name) {
		return res.status(400).json({
			success: false,
			data: { message: "Provide all of the inputs." },
		});
	}

	next();
};

export default signupBodyValidate;
