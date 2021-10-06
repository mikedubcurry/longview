import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;

// append 'test' to dbName if running tests
const sqlConnection = new Sequelize(process.env.NODE_ENV === 'test' ? dbName + 'test' : dbName, dbUser, dbPassword, {
	dialect: 'postgres',
	port: 5432,
	logging: false,
});

export { sqlConnection };
