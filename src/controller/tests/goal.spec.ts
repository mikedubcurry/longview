import { config } from 'dotenv';
config();
import { createGoal, getGoal, getGoals, updateGoal, deleteGoal } from '../goal';
import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';

const db = sqlConnection;

describe('goal controller', () => {
	// beforeAll(async () => {
	// 	// await dbInit();
	// });
	it('should create a goal', async () => {
		const goal = 'practice TDD';

		await createGoal(goal);

		const [result] = await db.query('select * from goals');

		expect(result).toHaveLength(1);
	});

	it('should throw if no goal is entered when creating a goal', async () => {
		const emptyGoal = '';

		await expect(createGoal(emptyGoal)).rejects.toThrow();
	});

	it('should get a single goal', async () => {
		expect('write this test').toBe(false);
	});
	it('should get all goals for a user', async () => {
		expect('write this test').toBe(false);
	});
	it('should update a goal', async () => {
		expect('write this test').toBe(false);
	});
	it('should throw if to be updated goal does not exist', async () => {
		expect('write this test').toBe(false);
	});
	it('should delete a goal', async () => {
		expect('write this test').toBe(false);
	});
	it('should throw if to be deleted goal does not exist', async () => {
		expect('write this test').toBe(false);
	});

	afterAll(async () => {
		// await db.query('delete from goals');
		await db.close();
	});
});
