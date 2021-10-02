import { DataTypes, Model, Optional } from 'sequelize';

import { sqlConnection } from 'db';

export interface NoteInput extends Optional<TNote, 'id'> {}

class Note extends Model<TNote, NoteInput> implements TNote {
	public id!: number;
	public text!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Note.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		text: {
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

export { Note };
