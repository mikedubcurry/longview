import supertest from 'supertest';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';
import { createUser } from '../../controller/user';
import { app } from '../../app';

const request = supertest(app);

describe('auth service', () => {
	beforeAll((done) => {
		setUp(done);
	}, 10000);

	afterEach((done) => {
		cleanUp(done);
	}, 10000);

	afterAll((done) => {
		closeDb(done);
	}, 10000);
	it('should verify auth test suite runs', () => {
		expect(1 + 1).toEqual(2);
	}, 10000);

	// test for logIn handler
	// it('should return a valid jwt on successful login', async () => {
	// 	await createUser('jotoro', 'password');

	// 	const response = await request.post('/user/login').send({ username: 'jotoro', password: 'password' });

	// 	expect(response.status).toBe(200);

	// 	const token = response.body;

	// 	const tokenIsValid = verify(token, process.env.JWT_SECRET!);

	// 	// await deleteUser('jotoro', 'password');
	// });

	it('should return a 400 code for missing username or password', async () => {
		await createUser('jotoro', 'password');

		const noPassword = await supertest(app).post('/user/login').send({ username: 'jotoro', password: '' });

		expect(noPassword.status).toBe(400);

		const noUsername = await supertest(app).post('/user/login').send({ username: '', password: 'password' });

		expect(noUsername.status).toBe(400);

		// await deleteUser('jotoro', 'password');
	}, 10000);

	// it('should return 401 unauthorized for incorrect username or password', async () => {
	// 	await createUser('jotoro', 'password');

	// 	const wrongUsername = await supertest(app).post('/user/login').send({ username: 'jojo', password: 'password' });

	// 	expect(wrongUsername.status).toBe(401);

	// 	const wrongPassword = await supertest(app).post('/user/login').send({ username: 'jotoro', password: 'bizarre' });

	// 	expect(wrongPassword.status).toBe(401);

	// 	await deleteUser('jotoro', 'password');
	// });

	// test for logOut handler

	// test for signUp handler

	// test for deleteUser handler
});

function setUp(done: jest.DoneCallback) {
	sqlConnection.authenticate().then(() => {
		// sqlConnection.sync({ force: true, alter: true }).then(() => {
		// 	done();
		// });
		dbInit().then(() => {
			done()
		})
	});
}

function cleanUp(done: jest.DoneCallback) {
	sqlConnection.query('delete from users;').then((d) => {
		done();
	});
}

function closeDb(done: jest.DoneCallback) {
	sqlConnection.close().then(() => {
		done();
	});
}
