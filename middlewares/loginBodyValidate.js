const loginBodyValidate = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			data: { message: "Provide all of the inputs." },
		});
	}

	next();
};

export default loginBodyValidate;
