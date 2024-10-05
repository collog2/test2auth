const doesUserExist = (req, res, next) => {
	const user = req.user;

	if (!user) {
		return res.status(404).json({
			success: false,
			data: { message: "user doesn't exist." },
		});
	}

	next();
};

export default doesUserExist;
