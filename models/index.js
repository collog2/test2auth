import { Sequelize } from "@sequelize/core";
// import { PostgresDialect } from "@sequelize/postgres";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";
import userFactory from "./user.model.js";
import otpFactory from "./otp.model.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } =
	dotenv.config().parsed;

const sequelize = new Sequelize({
	dialect: MySqlDialect,
	database: DB_NAME,
	user: DB_USER,
	host: DB_HOST,
	port: +DB_PORT,
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

const User = userFactory(sequelize, Sequelize);
const Otp = otpFactory(sequelize, Sequelize);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User;
db.otp = Otp;

export default db;
