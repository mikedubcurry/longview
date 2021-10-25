import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { createGoal } from '../../controller/goal';
import { app } from '../../app';
import { User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';

const request = supertest(app);

const db = sqlConnection;

const testUser = { username: 'testuser', password: 'password' };
const altUser = { username: 'testuser2', password: 'password' };
let user: User;
let user2: User;
let authHeader: string;

describe('goal service', () => {
	beforeAll(async () => {
		user = await createUser(testUser.username, testUser.password);
		user2 = await createUser(altUser.username, altUser.password);
		authHeader = 'Bearer ' + sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!);
	});

	afterEach(async () => {
		await db.query('delete from goals');
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
		expect(response.status).toBe(200);
		const [result] = await db.query(`select * from goals where goals."goal" = '${goal}'`);

		expect(result).toHaveLength(1);
	});

	it('should get all a users goals', async () => {
		const goals = ['goal1', 'goal2', 'goal3'];

		await Promise.all(
			goals.map((goal) => {
				return createGoal(goal, user.id);
			})
		);

		const response = await request.get('/goals').set('authorization', authHeader);

		expect(response.body).toHaveProperty('goals');

		if (response.body.goals.length) {
			expect(response.body.goals).toHaveLength(3);
		}
	});

	it('should return 400 bad input if goal text, goalId is not passed to updateGoal', async () => {
		const goal = 'testGoal';
		const newText = 'updatedGoal';
		const newGoal = await createGoal(goal, user.id);
		const response1 = await request.patch(`/goals/${newGoal.id}`).set('authorization', authHeader).send({ goal: '' });

		expect(response1.status).toBe(400);

		const response2 = await request.patch(`/goals/${0}`).set('authorization', authHeader).send({ goal: newText });

		expect(response2.status).toBe(400);
	});

	it('should return 401 unauthorized if the goal does not belong to the user', async () => {
		const goal = 'testGoal';
		const newText = 'updatedGoal';
		const newGoal = await createGoal(goal, user2.id);

		const response = await request
			.patch(`/goals/${newGoal.id}`)
			.set('authorization', authHeader)
			.send({ goal: newText });

		expect(response.status).toBe(401);
	});

	it('should return 404 not found if to be updated goal does not exist', async () => {
		const newText = 'updatedGoal';

		const response = await request.patch(`/goals/${999}`).set('authorization', authHeader).send({ goal: newText });

		expect(response.status).toBe(404);
	});

	it('should update a goal', async () => {
		const goal = 'testGoal';
		const newText = 'updatedGoal';
		const newGoal = await createGoal(goal, user.id);
		const response = await request
			.patch(`/goals/${newGoal.id}`)
			.set('authorization', authHeader)
			.send({ goal: newText });

		expect(response.status).toBe(200);

		const [[result]] = await db.query(`select * from goals where id = '${newGoal.id}'`);

		expect(result).toHaveProperty('goal');
		const { goal: updatedText } = result as { goal: string };
		expect(updatedText).toEqual(newText);
	});

	it('should return 400 bad input if goalId is not passed to deleteGoal', async () => {
		const response = await request.delete('/goals/undefined').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 401 unauthorized if the to be deleted goal does not belong to user', async () => {
		const goal = 'testgoal';
		const newGoal = await createGoal(goal, user2.id);

		const response = await request.delete(`/goals/${newGoal.id}`).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it('should return 404 not found if the to be deleted goal does not exist', async () => {
		const response = await request.delete('/goals/99999').set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should delete a goal', async () => {
		const goal = 'testGoal';
		const newGoal = await createGoal(goal, user.id);

		const response = await request.delete(`/goals/${newGoal.id}`).set('authorization', authHeader);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe(1);
	});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.close();
	});
});
