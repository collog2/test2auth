import jwt from "jsonwebtoken";

const authorize = (req, res, next) => {
	//authorization: 'Bearer TOKEN'
	const [type, token] = req.headers["authorization"].split(" ");
	if (!token) {
		return res.status(401).json({ message: "no JWT provided." });
	}

	const user = jwt.verify(token, process.env.JWT_SECRET);
	req["user"] = user;

	next();
};

export default authorize;
