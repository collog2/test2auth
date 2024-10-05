import { Sequelize } from "sequelize";
// import { PostgresDialect } from "@sequelize/postgres";
// import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";
import userFactory from "./user.model.js";
import otpFactory from "./otp.model.js";
import mysql2 from "mysql2";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } =
	dotenv.config().parsed;

const sequelize0 = new Sequelize({
	dialect: "mysql",
	username: DB_USER,
	password: DB_PASSWORD,
	dialectModule: mysql2,
});
try {
	await sequelize0.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
} catch (error) {
	console.error(error);
}

const sequelize = new Sequelize({
	dialect: "mysql",
	database: DB_NAME,
	username: DB_USER,
	host: DB_HOST,
	port: +DB_PORT,
	password: DB_PASSWORD,
	dialectModule: mysql2,
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
