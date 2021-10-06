import { config } from 'dotenv';
config();

import { sqlConnection } from './db';
import { dbInit } from './db/init';
import { app } from './app';
import { authRoutes, protectedRoutes } from './routes';

sqlConnection.authenticate().then(() => {
	dbInit();


	app.listen(process.env.PORT || 3000, () => {
		console.log(`listening on port ${process.env.PORT || 3000}`);
	});
});
