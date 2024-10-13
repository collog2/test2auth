import express from "express";
import loginController from "../controllers/index/login.controller.js";
import indexController from "../controllers/index/index.controller.js";
import loginBodyValidate from "../middlewares/loginBodyValidate.js";
import signupBodyValidate from "../middlewares/signupBodyValidate.js";
import signupController from "../controllers/index/signup.controller.js";
import userValidate from "../middlewares/userValidate.js";
import forgetController from "../controllers/index/forget.controller.js";
import verifyController from "../controllers/index/verify.controller.js";
import resetController from "../controllers/index/reset.controller.js";
import doesUserExist from "../middlewares/doesUserExist.js";
import doesUserNotExist from "../middlewares/doesUserNotExist.js";

var router = express.Router();

router.get("/", indexController);

router.post(
	"/login",
	loginBodyValidate,
	userValidate,
	doesUserExist,
	loginController
);

router.post(
	"/signup",
	signupBodyValidate,
	userValidate,
	doesUserNotExist,
	signupController
);

router.post("/forgetPassword", userValidate, forgetController);

router.post("/verifyOTP", verifyController);

router.post("/resetPassword", resetController);

export default router;
