const otpFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const Otp = sequelize.define("otp", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		code: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		expires: {
			type: DataTypes.DATE,
			defaultValue: Date.now() + 10 * 60 * 1000,
		},
	});

	return Otp;
};

export default otpFactory;
