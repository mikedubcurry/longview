import supertest from 'supertest';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';
import { createUser, deleteUser } from '../../controller/user';
import { app } from '../../app';

const request = supertest(app);

const db = sqlConnection;

describe('auth service', () => {
	it('should verify auth test suite runs', () => {
		expect(1 + 1).toEqual(2);
	});

	// test for logIn handler


	it('should return a 400 code for missing username or password', async () => {
		const username = 'authtest1';
		const password = 'password';
		await createUser(username, password);

		const noPassword = await supertest(app).post('/user/login').send({ username: username, password: '' });

		expect(noPassword.status).toBe(400);

		const noUsername = await supertest(app).post('/user/login').send({ username: '', password: password });

		expect(noUsername.status).toBe(400);

		await deleteUser(username, password);
	});

	it('should return 401 unauthorized for incorrect username or password', async () => {
		const username = 'authtest2';
		const password = 'password';
		await createUser(username, password);

		try {
			const wrongUsername = await supertest(app).post('/user/login').send({ username: 'jojo', password: password });

			expect(wrongUsername.status).toBe(401);

			const wrongPassword = await supertest(app).post('/user/login').send({ username: username, password: 'bizarre' });

			expect(wrongPassword.status).toBe(401);
		} catch (e) {
			console.error(e);
		}

		await deleteUser(username, password);
	});
	it('should return a valid jwt on successful login', async () => {
		const username = 'authtest3';
		const password = 'password';

		await createUser(username, password);

		const response = await request.post('/user/login').send({ username, password });
		const { token } = response.body;

		expect(response.status).toBe(200);
		try {
			const tokenIsValid = verify(token, process.env.JWT_SECRET!);
			expect(tokenIsValid).toBeTruthy();
		} catch (e) {
			console.error(e);
		}
		await deleteUser(username, password);
	});
	// test for logOut handler

	// test for signUp handler

	// test for deleteUser handler
	afterAll(async () => {
		// await db.query('delete from users');
		await db.close();
	});
});
