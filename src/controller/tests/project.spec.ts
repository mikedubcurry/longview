import { config } from 'dotenv';
config();
import { addGoal, addNote, createProject, deleteProject, getProject, getProjects, removeGoal } from '../project';
import { createUser } from '../user';
import { createGoal } from '../goal';
import { sqlConnection } from '../../db';

const db = sqlConnection;

let user: { id: number };
let goal: { id: number };

describe('goal controller', () => {
	beforeAll(async () => {
		user = await createUser('projectcontroller', 'projectcontroller');
		goal = await createGoal('proejctGoalTest', user.id);
	});
	afterEach(async () => {
		await db.query('delete from projects;');
	});

	// createProject
	//    check for idea
	//    check for description
	//    check for goalId
	//    check that goal exists
	//    check user exists
	//    check goal is owned by user
	it('should throw BadInputError if idea is not passed to createProject', async () => {
		const idea = '';
		const description = 'projectDescTest';

		await expect(createProject(idea, description, user.id)).toThrow();
	});
	it('should throw BadInputError if description is not passed to createProject', async () => {});
	it('should throw BadInputError if goalId is not passed to createProject', async () => {});
	it('should throw BadInputError if goal does not exist', async () => {});
	it('should throw AuthError if user does not exist', async () => {});
	it('should throw AuthError if goal does not belong to user', async () => {});
	it('should create a project');

	// getProject
	// getProjects
	// addGoal
	// addNote
	// deleteProject
	// removeGoal

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
		await db.query('delete from projects;');
		await db.query('delete from goals');
		await db.close();
	}, 1000);
});
