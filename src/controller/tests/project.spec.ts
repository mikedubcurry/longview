import { config } from 'dotenv';
config();
import {
	addGoal,
	addNote,
	createProject,
	deleteProject,
	getProject,
	getProjects,
	removeGoal,
	updateProject,
} from '../project';
import { createUser } from '../user';
import { createGoal } from '../goal';
import { sqlConnection } from '../../db';
// import {dbInit} from '../../db/init'
import { AuthError, BadInputError, NonExistentError } from '../utlis';
import { Project } from '../../model';
// dbInit()
const db = sqlConnection;

let user: { id: number };
let goal: { id: number };
let goal2: { id: number };
let altUser: { id: number };
let altGoal: { id: number };

describe('goal controller', () => {
	beforeAll(async () => {
		user = await createUser('projectcontroller', 'projectcontroller');
		goal = await createGoal('proejctGoalTest', user.id);
		goal2 = await createGoal('projectGoal2', user.id);
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

		const [result] = (await db.query(`select * from projects where "ownerId" = '${user.id}'`)) as Project[][];

		expect(result).toHaveLength(1);

		expect(result[0].goalId).toEqual(goal.id);
	});

	it('should create a project without a goal', async () => {
		const idea = 'projectIdeaTest';
		const description = 'projectDescTest';

		const project = await createProject(idea, description, user.id);

		const [result] = (await db.query(`select * from projects where "ownerId" = '${user.id}'`)) as Project[][];

		expect(result).toHaveLength(1);

		expect(result[0].goalId).toBeNull();
	});

	it('should throw BadInputError if no projectId is passed to getProject', async () => {
		const idea = 'projectControllerTest';
		const description = 'projectDescriptionTest';
		const project = await createProject(idea, description, user.id);

		await expect(getProject(NaN, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownerId is passed to getProject', async () => {
		const idea = 'projectControllerTest';
		const description = 'projectDescriptionTest';
		const project = await createProject(idea, description, user.id);

		await expect(getProject(project.id, NaN)).rejects.toThrowError(BadInputError);
	});

	it('should throw  NonExistentError if project does not exist', async () => {
		await expect(getProject(99999, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if project does not belong to user', async () => {
		const idea = 'projectControllerTest';
		const description = 'projectDescriptionTest';
		const project = await createProject(idea, description, user.id);

		await expect(getProject(project.id, altUser.id)).rejects.toThrowError(AuthError);
	});

	it('should get a specified project', async () => {
		const idea = 'projectControllerTest';
		const description = 'projectDescriptionTest';
		const project = await createProject(idea, description, user.id);

		const requestedProject = await getProject(project.id, user.id);

		expect(project.id).toEqual(requestedProject.id);
	});

	it('should throw BadInputError if no ownerId is passed to getProjects', async () => {
		const falseyOwnerId = 0;

		await expect(getProjects(falseyOwnerId)).rejects.toThrowError(BadInputError);
	});

	it("should get all a user's projects", async () => {
		const projects = [
			{ idea: 'testProject1', description: 'testDesc' },
			{ idea: 'testProject2', description: 'testDesc' },
			{ idea: 'testProject3', description: 'testDesc' },
		];
		// bulk create projects
		await Promise.all(
			projects.map(async (project) => {
				await createProject(project.idea, project.description, user.id);
			})
		);

		const myGoals = await getProjects(user.id);

		expect(myGoals).toHaveLength(3);
	});
	// updateProject
	it('should throw BadInputError if no projectId is passed to updateProject', async () => {
		const newProjectData = { idea: 'newIdea', description: 'newDescription' };

		await expect(updateProject(NaN, user.id, newProjectData)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownerId is passed to updateProject', async () => {
		const newProjectData = { idea: 'newIdea', description: 'newDescription' };

		await expect(updateProject(9, NaN, newProjectData)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no idea or description is passed to updateProject', async () => {
		const newProjectData = { idea: '', description: '' };

		await expect(updateProject(9, 9, newProjectData)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if project does not exist', async () => {
		const newProjectData = { idea: 'newIdea', description: 'newDescription' };

		await expect(updateProject(9, user.id, newProjectData)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if to-be-updated project does not belong to user', async () => {
		const newProjectData = { idea: 'newIdea', description: 'newDescription' };

		const idea = 'updateProjectTest';
		const description = 'updateProjectTest';
		const project = await createProject(idea, description, user.id);

		await expect(updateProject(project.id, altUser.id, newProjectData)).rejects.toThrowError(AuthError);
	});

	it('should update a project', async () => {
		const newProjectData = { idea: 'newIdea', description: 'newDescription' };

		const idea = 'updateProjectTest';
		const description = 'updateProjectTest';
		const project = await createProject(idea, description, user.id);

		const updatedProject = await updateProject(project.id, user.id, newProjectData);

		const sameProject = await getProject(project.id, user.id);

		expect(updatedProject.idea).toEqual(sameProject.idea);
		expect(updatedProject.description).toEqual(sameProject.description);
	});
	// addGoal
	it('should throw BadInputError if no projectId is passed to addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(0, goal.id, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownerId is passed to addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, goal.id, 0)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no goalId is passed to addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, 0, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if project does not exist when calling addGoal', async () => {
		await expect(addGoal(9999, goal.id, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if user does not exist when calling addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, goal.id, 9999)).rejects.toThrowError(AuthError);
	});

	it('should throw NonExistentError if goal does not exist when calling addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, 999, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if project does not belong to user calling addGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, altGoal.id, altUser.id)).rejects.toThrowError(AuthError);
	});

	it('should throw AuthError if goal does not belong to user', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		await expect(addGoal(project.id, altGoal.id, user.id)).rejects.toThrowError(AuthError);
	});

	it('should add a goal to a project', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id);

		const withGoal = await addGoal(project.id, goal.id, user.id);

		const updatedProject = await getProject(project.id, user.id);

		expect(updatedProject.goalId).toEqual(goal.id);
	});

	it('should overwrite a goal on a project', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id, goal.id);

		const projectWithNewGoal = await addGoal(project.id, goal2.id, user.id);

		const updatedProject = await getProject(project.id, user.id);

		expect(updatedProject.goalId).toEqual(goal2.id);
	});
	// removeGoal
	it('should throw BadInputError if no projectId is passed to removeGoal', async () => {
		await expect(removeGoal(0, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownerId is passed to removeGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id, goal.id);

		await expect(removeGoal(project.id, 0)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if project does not exist when calling removeGoal', async () => {
		await expect(removeGoal(9999, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw NonExistentError if user does not exist when calling removeGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id, goal.id);

		await expect(removeGoal(project.id, 999)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if project does not belong to user when calling removeGoal', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id, goal.id);

		await expect(removeGoal(project.id, altUser.id)).rejects.toThrowError(AuthError);
	});

	it('should remove a goal from a project by setting goalId to null', async () => {
		const project = await createProject('testIdea', 'testDescription', user.id, goal.id);

		const withoutGoal = await removeGoal(project.id, user.id);

		const updated = await getProject(project.id, user.id);

		expect(updated.goalId).toBeNull();
	});
	// deleteProject
	// addNote

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
		await db.query(`delete from users where id = '${altUser.id}'`);
		await db.query('delete from projects;');
		await db.query(`delete from goals where id = '${goal.id}'`);
		await db.query(`delete from goals where id = '${goal2.id}'`);
		await db.query(`delete from goals where id = '${altGoal.id}'`);
		await db.close();
	});
});
