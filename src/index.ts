import express from 'express';
import { config } from 'dotenv';

config();

import { sqlConnection } from './db';
import { dbInit } from './db/init';
import { User } from './model';
import { useTokenAuth } from './middleware';
import { routes } from './routes';

sqlConnection.authenticate();

dbInit();

const app = express();

app.use(express.json());
app.use(useTokenAuth);

routes.forEach((route) => {
	app[route.method](route.path, (req, res, next) => {
		route
			.handler(req, res)
			.then(() => next)
			.catch((err) => next(err));
	});
});

app.get('/', (req, res) => {
	console.log(req.headers.authorization);
	res.send('ay lmao');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`listening on port: ${process.env.PORT || 3000}`);
});
