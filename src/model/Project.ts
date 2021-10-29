import {
	DataTypes,
	Model,
	Optional,
	Association,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyCreateAssociationMixin,
} from 'sequelize';

import { sqlConnection } from '../db';
import { Note } from '../model';

interface IProject {
	idea: string;
	description: string;
	goalId?: number | null;
	notes?: Note[];
	id: number;
	ownerId: number;
}
export interface ProjectInput extends Optional<IProject, 'id' | 'ownerId'> {}

class Project extends Model<IProject, ProjectInput> implements IProject {
	public id!: number;
	public idea!: string;
	public description!: string;
	public ownerId!: number;
	public goalId?: number | null;
	public notes?: Note[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getGoals!: HasManyGetAssociationsMixin<Note>;
	public addNote!: HasManyAddAssociationMixin<Note, number>;
	public createNote!: HasManyCreateAssociationMixin<Note>;

	public static associations: {
		notes: Association<Project, Note>;
	};
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
		goalId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: 'projects',
		freezeTableName: true,
		sequelize: sqlConnection,
		timestamps: true,
	}
);

Project.hasMany(Note, {
	sourceKey: 'id',
	foreignKey: 'projectId',
	as: 'notes',
});

Note.belongsTo(Project, {
	targetKey: 'id',
	foreignKey: 'projectId',
});

export { Project };
