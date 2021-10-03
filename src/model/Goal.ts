import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from '../db';
import { User } from '../model';

interface IGoal {
	goal: string;
	// createdOn: Date;
	// notes: Note[];
	id: number;
	ownerId: number;
}
export interface GoalInput extends Optional<IGoal, 'id'> {}

class Goal extends Model<IGoal, GoalInput> implements IGoal {
	public id!: number;
	public goal!: string;
	public ownerId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Goal.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		ownerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
