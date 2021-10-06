import express from 'express';

import { useTokenAuth } from './middleware';
import { authRoutes, protectedRoutes } from './routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	// console.log(req.headers.authorization);
	res.json({ test: 'pass' });
});


authRoutes.forEach((route) => {
	app[route.method](route.path, (req, res, next) => {
		route
			.handler(req, res)
			.then(() => next)
			.catch((err) => next(err));
	});
});

app.use(useTokenAuth);

protectedRoutes.forEach((route) => {
	app[route.method](route.path, (req, res, next) => {
		route
			.handler(req, res)
			.then(() => next)
			.catch((err) => next(err));
	});
});

export { app };
