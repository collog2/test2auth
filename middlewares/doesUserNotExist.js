const doesUserNotExist = (req, res, next) => {
	const user = req.user;

	if (user) {
		return res.status(409).json({
			success: false,
			data: { message: "Email is taken." },
		});
	}

	next();
};

export default doesUserNotExist;
