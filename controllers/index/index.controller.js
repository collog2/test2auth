const indexController = (req, res) => {
	return res.status(200).json({
		success: true,
		data: { message: "hello world!" },
	});
};

export default indexController;
