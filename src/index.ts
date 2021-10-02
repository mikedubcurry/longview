import express from 'express';
import { config } from 'dotenv';

config();

import { sqlConnection } from './db';
import { dbInit } from './db/init';

sqlConnection.authenticate();

dbInit();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('ay lmao');
});
app.listen(process.env.PORT || 3000, () => {
	console.log(`listening on port: ${process.env.PORT || 3000}`);
});
