import express from 'express';

import { useTokenAuth } from './middleware';
import { authRoutes, protectedRoutes } from './routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ test: 'pass' });
});

// register each auth route, accessible without basic auth token
authRoutes.forEach((route) => {
	app[route.method](route.path, (req, res, next) => {
		route
			.handler(req, res)
			.then(() => next)
			.catch((err) => next(err));
	});
});

// use basic auth token for routes that manipulate user data
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
