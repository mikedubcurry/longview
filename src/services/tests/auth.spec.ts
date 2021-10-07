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

	// test for signUp handler
	it('should create a new user on signup', async () => {
		const username = 'authtest4';
		const password = 'password';

		// we dont care about the request here, just verifying a user is created in the db
		await request.post('/user/signup').send({ username, password });

		const [result] = await db.query(`select * from users where username = '${username}'`);

		expect(result).toHaveLength(1);

		await deleteUser(username, password);
	});
	it('should return 400 code for no password or no username', async () => {
		const username = 'authtest5';
		const password = 'password';

		const noPassword = await supertest(app).post('/user/signup').send({ username: username, password: '' });

		expect(noPassword.status).toBe(400);

		const noUsername = await supertest(app).post('/user/signup').send({ username: '', password: password });

		expect(noUsername.status).toBe(400);

		// user is not created so no need to clean up
	});
	it('should return 400 if user already exists', async () => {
		const username = 'authtest6';
		const password = 'password';

		await createUser(username, password);

		const response = await request.post('/user/signup').send({ username, password });

		expect(response.status).toBe(400);

		await deleteUser(username, password);
	});
	it("should require passwords and usernames to be 'strong' (greater than 8 chars), else return a 400", async () => {
		const username = 'authtest7';
		const badUsername = 'mike';
		const password = 'password';
		const badPassword = 'cat';

		const response = await request.post('/user/signup').send({ username, password: badPassword });

		expect(response.status).toBe(400);

		const response2 = await request.post('/user/signup').send({ username: badUsername, password });

		expect(response2.status).toBe(400);
		// no user is created so no clean up
	});

	it('should return a valid token after successful signup', async () => {
		const username = 'authtest8';
		const password = 'password';

		const response = await request.post('/user/signup').send({ username, password });

		expect(response.status).toBe(200);

		const { token } = response.body;

		expect(token).toBeTruthy();

		try {
			const tokenIsValid = verify(token, process.env.JWT_SECRET!);
			expect(tokenIsValid).toBeTruthy();
		} catch (e) {
			console.error(e);
		}
		await deleteUser(username, password);
	});

	// test for deleteUser handler
	it('should return 401 unauthorized if no auth token is included in the request', async () => {
		expect('write this test').toBe(false);
	});

	it('should return 401 unauthorized if password is incorrect', async () => {
		expect('write this test').toBe(false);
	});

	it('should return 401 if username is incorrect', async () => {
		expect('write this test').toBe(false);
	});

	it('should return 400 if no username or no password', async () => {
		expect('write this test').toBe(false);
	});

	it('should delete the user in question if all cases are met', async () => {
		expect('write this test').toBe(false);
	});

	afterAll(async () => {
		// await db.query('delete from users');
		await db.close();
	});
});
