import express from 'express';

import { useTokenAuth } from './middleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(useTokenAuth);



app.get('/', (req, res) => {
	console.log(req.headers.authorization);
	res.send('ay lmao');
});

export { app };
