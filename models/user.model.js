const userFactory = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;
	const User = sequelize.define("user", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		canResetPassword: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return User;
};

export default userFactory;
