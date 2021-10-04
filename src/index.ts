import { config } from 'dotenv';
config();

import { sqlConnection } from './db';
import { dbInit } from './db/init';
import { app } from './app';
import { routes } from './routes';

sqlConnection.authenticate().then(() => {
	dbInit();

	routes.forEach((route) => {
		app[route.method](route.path, (req, res, next) => {
			route
				.handler(req, res)
				.then(() => next)
				.catch((err) => next(err));
		});
	});

	app.listen(process.env.PORT || 3000, () => {
		console.log(`listening on port ${process.env.PORT || 3000}`);
	});
});
