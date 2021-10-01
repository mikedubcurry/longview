import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from 'db';

export interface UserInput extends Optional<User, 'id'> {}

class User extends Model<TUser, UserInput> implements TUser {
	public id!: number;
	public username!: string;
	public password!: string;

	// public goals?: Goal[];
	// public projects?: Project[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		paranoid: true,
		timestamps: true,
		sequelize: sqlConnection,
	}
);

export { User };
