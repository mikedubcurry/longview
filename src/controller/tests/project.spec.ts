import { config } from 'dotenv';
config();
import { addGoal, addNote, createProject, deleteProject, getProject, getProjects, removeGoal } from '../project';
import { createUser } from '../user';
import { createGoal } from '../goal';
import { sqlConnection } from '../../db';
// import {dbInit} from '../../db/init'
import { AuthError, BadInputError } from '../utlis';
import { Project } from '../../model';
// dbInit()
const db = sqlConnection;

let user: { id: number };
let goal: { id: number };
let altUser: { id: number };
let altGoal: { id: number };

describe('goal controller', () => {
	beforeAll(async () => {
		user = await createUser('projectcontroller', 'projectcontroller');
		goal = await createGoal('proejctGoalTest', user.id);
		altUser = await createUser('projectcontrollerAlt', 'password');
		altGoal = await createGoal('projectGaolAlt', altUser.id);
	});
	afterEach(async () => {
		await db.query('delete from projects;');
	});

	it('should throw BadInputError if idea is not passed to createProject', async () => {
		const idea = '';
		const description = 'projectDescTest';

		await expect(createProject(idea, description, user.id, goal.id)).rejects.toThrowError(BadInputError);
	});
	it('should throw BadInputError if description is not passed to createProject', async () => {
		const idea = 'projectIdeaTest';
		const description = '';

		await expect(createProject(idea, description, user.id, goal.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if goal does not exist', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		await expect(createProject(idea, description, user.id, 999)).rejects.toThrowError(BadInputError);
	});

	it('should throw AuthError if user does not exist', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		await expect(createProject(idea, description, 999, goal.id)).rejects.toThrowError(AuthError);
	});
	it('should throw AuthError if goal does not belong to user', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		await expect(createProject(idea, description, user.id, altGoal.id)).rejects.toThrowError(AuthError);
	});
	it('should create a project with a goal', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		const project = await createProject(idea, description, user.id, goal.id);

		const [result] = await db.query(`select * from projects where "ownerId" = '${user.id}'`) as Project[][];
		console.log(result);

		expect(result).toHaveLength(1);

		expect(result[0].goalId).toEqual(goal.id)	


	});
	it('should create a project without a goal', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		const project = await createProject(idea, description, user.id,);

		const [result] = await db.query(`select * from projects where "ownerId" = '${user.id}'`) as Project[][];

		expect(result).toHaveLength(1);

		expect(result[0].goalId).toBeNull()		
		
	});

	// getProject
	// getProjects
	// addGoal
	// addNote
	// deleteProject
	// removeGoal

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
		await db.query(`delete from users where id = '${altUser.id}'`);
		await db.query('delete from projects;');
		await db.query(`delete from goals where id = '${goal.id}'`);
		await db.query(`delete from goals where id = '${altGoal.id}'`);
		await db.close();
	});
});
