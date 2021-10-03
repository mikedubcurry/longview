import express from 'express';

import { useTokenAuth } from './middleware';
import { routes } from './routes';

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

export { app };
