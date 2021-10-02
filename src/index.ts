import express from 'express';
import { config } from 'dotenv';

config();

import { sqlConnection } from './db';
import { dbInit } from './db/init';
import { User } from './model';
import { useTokenAuth } from './middleware';

sqlConnection.authenticate();

dbInit();

const app = express();

app.use(express.json());
app.use(useTokenAuth)

app.get('/', (req, res) => {
	console.log(req.headers.authorization);
	
	res.send('ay lmao');
});
app.listen(process.env.PORT || 3000, () => {
	console.log(`listening on port: ${process.env.PORT || 3000}`);
});
