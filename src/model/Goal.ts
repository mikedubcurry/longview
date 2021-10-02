import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from 'db';

export interface GoalInput extends Optional<TGoal, 'id'> {}

class Goal extends Model<TGoal, GoalInput> implements TGoal {
	public id!: number;
	public goal!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Goal.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		goal: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		sequelize: sqlConnection,
		paranoid: true,
	}
);

export { Goal };
