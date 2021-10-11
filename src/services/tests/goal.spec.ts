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
		const goal = 'goaltest1';
		const response = await request.post('/goals').send({ goal });
		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no goal is passed to createGoal', async () => {
		const goal = '';
		const response = await request.post('/goals').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should create a goal', async () => {
		const goal = 'goaltest2';

		const response = await request.post('/goals').set('authorization', authHeader).send({ goal });

		const [result] = await db.query(`select * from goals where goal = '${goal}'`);

		expect(result).toHaveLength(1);
	});

	it('should return 400 bad input if goalId is not passed to getGoal', async () => {
		const goalId = undefined as unknown as number;
		const response = await request.get(`/goals/${goalId}`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 not found if goal does not exist', async () => {
		const response = await request.get('/goals/999').set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should get a single goal', async () => {
		const goal = 'testGoal';
		const newGoal = await createGoal(goal, user.id);

		const response = await request.get(`/goals/${newGoal.id}`).set('authorization', authHeader);
		expect(response.status).toBe(200)
		const [result] = await db.query(`select * from goals where goals."goal" = '${goal}'`);
		
		expect(result).toHaveLength(1)
	});

	// it('should get all a users goals', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 400 bad input if goal text, goalId is not passed to updateGoal', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 401 unauthorized if the goal does not belong to the user', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 404 not found if to be updated goal does not exist', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should update a goal', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 400 bad input if goalId is not passed to deleteGoal', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 401 unauthorized if the to be deleted goal does not exist', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should return 404 not found if the to be deleted goal does not exist', async () => {
	// 	expect(true).toBe(false);
	// });

	// it('should delete a goal', async () => {
	// 	expect(true).toBe(false);
	// });

	afterAll(async () => {
		await db.query('delete from goals');
		await deleteUser(testUser.username, testUser.password);
		await db.close();
	});
});
