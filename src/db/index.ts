import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;

const sqlConnection = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: 'postgres',
	port: 5432,
});

export { sqlConnection };
