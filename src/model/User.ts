import {
	DataTypes,
	Model,
	Optional,
	Association,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyCreateAssociationMixin,
} from 'sequelize';
import bcrypt from 'bcrypt';

import { sqlConnection } from '../db';
import { Goal, Project } from '../model';
interface IUser {
	username: string;
	password: string;
	id: number;
	// goals?: IGoal[];
	// projects?: Project[];
}
export interface UserInput extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserInput> implements IUser {
	public id!: number;
	public username!: string;
	public password!: string;

	// public goals?: Goal[];
	// public projects?: Project[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;

	public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
	public addProject!: HasManyAddAssociationMixin<Project, number>;
	public createProject!: HasManyCreateAssociationMixin<Project>;

	public getGoals!: HasManyGetAssociationsMixin<Goal>; // Note the null assertions!
	public addGoal!: HasManyAddAssociationMixin<Goal, number>;
	public createGoal!: HasManyCreateAssociationMixin<Goal>;

	public static associations: {
		projects: Association<User, Project>;
		goals: Association<User, Goal>;
	};
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
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
		tableName: 'users',
		freezeTableName: true,
		// paranoid: true,
		timestamps: true,
		sequelize: sqlConnection,
	}
);
User.beforeSave('hashPassword', (user) => {
	if (user.password) {
		const salt = bcrypt.genSaltSync(10, 'a');
		user.password = bcrypt.hashSync(user.password, salt);
	}
});
User.hasMany(Project, {
	foreignKey: 'ownerId',
	sourceKey: 'id',
	as: 'projects',
});

Project.belongsTo(User, {
	targetKey: 'id',
	foreignKey: 'ownerId',
});

User.hasMany(Goal, {
	foreignKey: 'ownerId',
	sourceKey: 'id',
	as: 'goals',
});

Goal.belongsTo(User, {
	targetKey: 'id',
	foreignKey: 'ownerId',
});

export { User };
