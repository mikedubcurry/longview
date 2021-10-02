import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from 'db';

export interface ProjectInput extends Optional<TProject, 'id'> {}

class Project extends Model<TProject, ProjectInput> implements TProject {
	public id!: number;
	public idea!: string;
	public description!: string;
	// public goal?: Goal;
	// public notes?: Note[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Project.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
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
		sequelize: sqlConnection,
		timestamps: true,
	}
);

export { Project };
