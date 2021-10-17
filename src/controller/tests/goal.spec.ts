import { config } from 'dotenv';
config();
import { createGoal, getGoal, getGoals, updateGoal, deleteGoal } from '../goal';
import { createUser } from '../user';
import { sqlConnection } from '../../db';
import { AuthError, BadInputError, NonExistentError } from '../utlis';

const db = sqlConnection;

let user: { id: number };

describe('goal controller', () => {
	beforeAll(async () => {
		user = await createUser('goalcontroller', 'goalcontroller');
	});
	afterEach(async () => {
		await db.query('delete from goals;')
	})
	it('should create a goal', async () => {
		const goal = 'goaltest1';

		await createGoal(goal, user.id);

		const [result] = await db.query(`select * from goals where goal = '${goal}'`);

		expect(result).toHaveLength(1);
	});

	it('should throw BadInputError if no goal is entered when creating a goal', async () => {
		const emptyGoal = '';

		await expect(createGoal(emptyGoal, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownderId is passed to createGoal', async () => {
		const goal = 'goalTest2';

		await expect(createGoal(goal, 0)).rejects.toThrowError(BadInputError);
	});

	it('should get a single goal', async () => {
		const goal = 'goalTest3';
		const newGoal = await createGoal(goal, user.id);

		const myGoal = await getGoal(newGoal.id, user.id);

		expect(myGoal).toBeTruthy();
	});

	it('should throw BadInput if no goalId or no ownerId is supplied to get a goal', async () => {
		const goalZero = 0;
		const goalId = 1;
		const zeroOwnerId = 0;

		await expect(getGoal(goalZero, user.id)).rejects.toThrowError(BadInputError);
		await expect(getGoal(goalId, zeroOwnerId)).rejects.toThrowError(BadInputError);
	});

	it('should throw AuthError if requested goal doesnt belong to owner', async () => {
		const goal = 'goaltest4';
		const notOwner = 6;
		const newGoal = await createGoal(goal, user.id);

		await expect(getGoal(newGoal.id, notOwner)).rejects.toThrowError(AuthError);
	});

	it('should get all goals for a user', async () => {
		const goals = ['goaltest6', 'goaltest7', 'goaltest8'];
		// bulk create goals
		await Promise.all(
			goals.map(async (goal) => {
				await createGoal(goal, user.id);
			})
		);

		const myGoals = await getGoals(user.id);

		expect(myGoals).toHaveLength(3);
	});

	it('should throw AuthError if no ownerId is supplied to getGoals', async () => {
		const goals = ['goaltest9', 'goaltest10', 'goaltest11'];
		const falseyOwnerId = 0;
		// bulk create goals
		// await Promise.all(
		// 	goals.map(async (goal) => {
		// 		await createGoal(goal, user.id);
		// 	})
		// );

		await expect(getGoals(falseyOwnerId)).rejects.toThrow();
	});

	it('should update a goal', async () => {
		const goal = 'goaltest12';
		const newGoal = await createGoal(goal, user.id);

		const updatedGoalText = 'updatedGoal';

		const updatedGoal = await updateGoal(newGoal.id, updatedGoalText, user.id);

		const result = await getGoal(newGoal.id, user.id);

		expect(result!.goal).toBe(updatedGoalText);
	});

	it('should throw BadInputError if no goal text is passed to updateGoal', async () => {
		const goal = 'goaltest13';
		const newGoal = await createGoal(goal, user.id);

		await expect(updateGoal(newGoal.id, '', user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInput if no ownerId is passed to updateGoal', async () => {
		const goal = 'goaltest14';
		const newGoal = await createGoal(goal, user.id);
		const newGoalText = 'newText';

		await expect(updateGoal(newGoal.id, newGoalText, 0)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if to be updated goal does not exist', async () => {
		const goal = 'goaltest15';

		await expect(updateGoal(99, goal, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if user is trying to update a goal that does not belong to them', async () => {
		const goal = 'goaltest16';
		const newGoal = await createGoal(goal, user.id);

		const newGoalText = 'newText';

		await expect(updateGoal(newGoal.id, newGoalText, 9)).rejects.toThrowError(AuthError);
	});

	it('should delete a goal', async () => {
		const goal = 'goaltest17';
		const newGoal = await createGoal(goal, user.id);

		const deleted = await deleteGoal(newGoal.id, user.id);

		expect(deleted).toBe(1);
	});

	it('should throw BadInputError if no goalId is passed to deleteGoal', async () => {

		await expect(deleteGoal(0, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if ownerId is not passed to deleteGoal', async () => {
		const goal = 'goaltest18';
		const newGoal = await createGoal(goal, user.id);

		await expect(deleteGoal(newGoal.id, 0)).rejects.toThrowError(BadInputError);
	});

	it('should throw AuthError if goal to be deleted does not belong to user', async () => {
		const goal = 'goaltest19';
		const newGoal = await createGoal(goal, user.id);
		const notOwner = 7;

		await expect(deleteGoal(newGoal.id, notOwner)).rejects.toThrowError(AuthError);
	});

	it('should throw NonExistentError if to be deleted goal does not exist', async () => {
		const nonExistentGoalId = 999;
		await expect(deleteGoal(nonExistentGoalId, user.id)).rejects.toThrowError(NonExistentError);
	});

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`)
		await db.query('delete from goals;');
		await db.close();
	});
});
