import { config } from 'dotenv';
config();
import { createGoal, getGoal, getGoals, updateGoal, deleteGoal } from '../goal';
import { sqlConnection } from '../../db';

const db = sqlConnection;

describe('goal controller', () => {
	it('should create a goal', async () => {
		const goal = 'goaltest1';
		const ownerId = 1;

		await createGoal(goal, ownerId);

		const [result] = await db.query('select * from goals');

		expect(result).toHaveLength(1);
	});

	it('should throw if no goal is entered when creating a goal', async () => {
		const emptyGoal = '';
		const ownerId = 1;

		await expect(createGoal(emptyGoal, ownerId)).rejects.toThrow();
	});

	it('should throw if no ownderId is passed to createGoal', async () => {
		const goal = 'goalTest2';
		const ownerId = 0;

		await expect(createGoal(goal, ownerId)).rejects.toThrow();
	});

	it('should get a single goal', async () => {
		const goal = 'goalTest3';
		const ownerId = 2;
		const newGoal = await createGoal(goal, ownerId);

		const myGoal = await getGoal(newGoal.id, ownerId);

		expect(myGoal).toBeTruthy();
	});

	it('should throw if no goalId or no ownerId is supplied to get a goal', async () => {
		const goalZero = 0;
		const goalId = 1;
		const zeroOwnerId = 0;
		const ownerId = 1;

		await expect(getGoal(goalZero, ownerId)).rejects.toThrow();
		await expect(getGoal(goalId, zeroOwnerId)).rejects.toThrow();
	});

	it('should throw if requested goal doesnt belong to owner', async () => {
		const goal = 'goaltest4';
		const ownerId = 5;
		const notOwner = 6;
		const newGoal = await createGoal(goal, ownerId);

		await expect(getGoal(newGoal.id, notOwner)).rejects.toThrow();
	});

	it('should get all goals for a user', async () => {
		const goals = ['goaltest6', 'goaltest7', 'goaltest8'];
		const ownerId = 9;
		// bulk create goals
		await Promise.all(
			goals.map(async (goal) => {
				await createGoal(goal, ownerId);
			})
		);

		const myGoals = await getGoals(ownerId);

		expect(myGoals).toHaveLength(3);
	});

	it('should throw if no ownerId is supplied to getGoals', async () => {
		const goals = ['goaltest9', 'goaltest10', 'goaltest11'];
		const ownerId = 9;
		const falseyOwnerId = 0;
		// bulk create goals
		await Promise.all(
			goals.map(async (goal) => {
				await createGoal(goal, ownerId);
			})
		);

		await expect(getGoals(falseyOwnerId)).rejects.toThrow();
	});

	it('should update a goal', async () => {
		const goal = 'goaltest12';
		const ownerId = 6;
		const newGoal = await createGoal(goal, ownerId);

		const updatedGoalText = 'updatedGoal';

		const updatedGoal = await updateGoal(newGoal.id, updatedGoalText, ownerId);

		const result = await getGoal(newGoal.id, ownerId);

		expect(result!.goal).toBe(updatedGoalText);
	});

	it('should throw if no goal text is passed to updateGoal', async () => {
		const goal = 'goaltest13';
		const ownerId = 8;
		const newGoal = await createGoal(goal, ownerId);

		await expect(updateGoal(newGoal.id, '', ownerId)).rejects.toThrow();
	});

	it('should throw if no ownerId is passed to updateGoal', async () => {
		const goal = 'goaltest14';
		const ownerId = 8;
		const newGoal = await createGoal(goal, ownerId);
		const newGoalText = 'newText';

		await expect(updateGoal(newGoal.id, newGoalText, 0)).rejects.toThrow();
	});

	it('should throw if to be updated goal does not exist', async () => {
		const goal = 'goaltest15';
		const ownerId = 3;

		await expect(updateGoal(99, goal, ownerId)).rejects.toThrow();
	});

	it('should throw if user is trying to update a goal that does not belong to them', async () => {
		const goal = 'goaltest16';
		const ownerId = 4;
		const newGoal = await createGoal(goal, ownerId);

		const newGoalText = 'newText';

		await expect(updateGoal(newGoal.id, newGoalText, 9)).rejects.toThrow();
	});

	it('should delete a goal', async () => {
		const goal = 'goaltest17';
		const ownerId = 1;
		const newGoal = await createGoal(goal, ownerId);

		const deleted = await deleteGoal(newGoal.id, ownerId);

		expect(deleted).toBe(1);
	});

	it('should throw if no goalId is passed to deleteGoal', async () => {
		const ownerId = 3;

		await expect(deleteGoal(0, ownerId)).rejects.toThrow();
	});

	it('should throw if ownerId is not passed to deleteGoal', async () => {
		const goal = 'goaltest18';
		const ownerId = 3;
		const newGoal = await createGoal(goal, ownerId);

		await expect(deleteGoal(newGoal.id, 0)).rejects.toThrow();
	});

	it('should throw if goal to be deleted does not belong to user', async () => {
		const goal = 'goaltest19';
		const ownerId = 8;
		const newGoal = await createGoal(goal, ownerId);
		const notOwner = 7;

		await expect(deleteGoal(newGoal.id, notOwner)).rejects.toThrow();
	});

	it('should throw if to be deleted goal does not exist', async () => {
		const nonExistentGoalId = 999;
		const ownerId = 7;
		await expect(deleteGoal(nonExistentGoalId, ownerId)).rejects.toThrow();
	});

	afterAll(async () => {
		await db.query('delete from goals;');
		await db.close();
	}, 3000);
});
