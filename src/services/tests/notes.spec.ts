import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { app } from '../../app';
import { User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';
import { createNote } from '../../controller/note';

const request = supertest(app);

const db = sqlConnection;

const testUser = { username: 'testuser', password: 'password' };
const altUser = { username: 'testuser2', password: 'password' };
let user: User;
let user2: User;
let authHeader: string;

describe('notes service', () => {
	beforeAll(async () => {
		user = await createUser(testUser.username, testUser.password);
		user2 = await createUser(altUser.username, altUser.password);
		authHeader = 'Bearer ' + sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!);
	});

	afterEach(async () => {
		await db.query('delete from notes');
	});

	it('should run notes service tests', async () => {
		expect(true).toBe(true);
	});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.close();
	});
});
