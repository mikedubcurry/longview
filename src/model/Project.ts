import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from '../db';
import { Goal, User } from '../model';

interface IProject {
	idea: string;
	description: string;
	goalId?: number;
	// notes?: Note[];
	id: number;
	ownerId: number;
}
export interface ProjectInput extends Optional<IProject, 'id' | 'ownerId'> {}

class Project extends Model<IProject, ProjectInput> implements IProject {
	public id!: number;
	public idea!: string;
	public description!: string;
	public ownerId!: number;
	public goalId?: number;
	// public notes?: Note[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
	// consider adding `addNote` association
}

Project.init(
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
		idea: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// goal
	},
	{
		paranoid: true,
		tableName: 'projects',
		freezeTableName: true,
		sequelize: sqlConnection,
		timestamps: true,
	}
);

export { Project };
