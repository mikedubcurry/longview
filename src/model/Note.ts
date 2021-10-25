import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from '../db';

interface INote {
	text: string;
	// createdOn: Date;
	id: number;
	ownerId: number;
}

export interface NoteInput extends Optional<INote, 'id'> {}

class Note extends Model<INote, NoteInput> implements INote {
	public id!: number;
	public text!: string;
	public ownerId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Note.init(
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
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		sequelize: sqlConnection,
		tableName: 'notes',
		freezeTableName: true,
		paranoid: true,
	}
);

export { Note };
