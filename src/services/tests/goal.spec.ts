import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { createGoal, updateGoal, deleteGoal, getGoal, getGoals } from '../../controller/goal';
import { app } from '../../app';
import { User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';

const request = supertest(app);

const db = sqlConnection;

const testUser = { username: 'testuser', password: 'password' };
let user: User;
let authHeader: string;

describe('goal service', () => {
	beforeAll(async () => {
		user = await createUser(testUser.username, testUser.password);
		authHeader = 'Bearer ' + sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!);
	});

	it('should return 401 unauthorized if no authHeader is passed to createGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 400 bad input if no goal or ownerId is passed to createGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 401 unauthorized if ownerId does not match authHeader when createGoal is called', async () => {
		expect(true).toBe(false);
	});

	it('should create a goal', async () => {
		expect(true).toBe(false);
	});

	it('should return 400 bad input if ownerId or goalId are not passed to getGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 401 unauthorized if authHeader does not match ownerId when calling getGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 404 not found if goal does not exist', async () => {
		expect(true).toBe(false);
	});

	it('should get a single goal', async () => {
		expect(true).toBe(false);
	});

	it('should return 400 bad input if no ownerId is passed to getGoals', async () => {
		expect(true).toBe(false);
	});

	it('should return 401 unauthorized if ownerId does not match authHeader in getGoals', async () => {
		expect(true).toBe(false);
	});

	it('should get all a users goals', async () => {
		expect(true).toBe(false);
	});

	it('should return 400 bad input if goal text, goalId or ownerId are not passed to updateGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 401 unauthorized if the goal does not belong to the user', async () => {
		expect(true).toBe(false);
	});

	it('should return 404 not found if to be updated goal does not exist', async () => {
		expect(true).toBe(false);
	});

	it('should update a goal', async () => {
		expect(true).toBe(false);
	});

	it('should return 400 bad input if goalId or ownerId are not passed to deleteGoal', async () => {
		expect(true).toBe(false);
	});

	it('should return 401 unauthorized if the to be deleted goal does not exist', async () => {
		expect(true).toBe(false);
	});

	it('should return 404 not found if the to be deleted goal does not exist', async () => {
		expect(true).toBe(false);
	});

	it('should delete a goal', async () => {
		expect(true).toBe(false);
	});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await db.close();
	});
});
