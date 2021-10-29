import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { app } from '../../app';
import { User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';
import { createProject } from '../../controller/project';
import { createGoal } from '../../controller/goal';

interface BaseProject {
	idea: string;
	description: string;
}

const request = supertest(app);

const db = sqlConnection;

const testUser = { username: 'testuser', password: 'password' };
const altUser = { username: 'testuser2', password: 'password' };
let user: User;
let user2: User;
let authHeader: string;

describe('projects service', () => {
	beforeAll(async () => {
		user = await createUser(testUser.username, testUser.password);
		user2 = await createUser(altUser.username, altUser.password);
		authHeader = 'Bearer ' + sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!);
	});

	afterEach(async () => {
		await db.query('delete from projects');
		await db.query('delete from goals');
	});

	// getUserProjects
	it('should return 401 unauthorized if no authHeader is passed to getUserProjects', async () => {
		const response = await request.get('/projects');

		expect(response.status).toBe(401);
	});

	it('should return an array of user projects', async () => {
		const projects: BaseProject[] = [
			{ idea: 'testproject1', description: 'testdescription1' },
			{ idea: 'testproject2', description: 'testdescription2' },
			{ idea: 'testproject3', description: 'testdescription3' },
		];
		// bulk create projects
		await Promise.all(
			projects.map((prj) => {
				return createProject(prj.idea, prj.description, user.id);
			})
		);
		const response = await request.get('/projects').set('authorization', authHeader);

		expect(response.body.projects).toHaveLength(3);
	});

	// // getSingleProject;
	it('should return 401 unauthorized if no authHeader is passed to getSingleProject', async () => {
		const project: BaseProject = { idea: 'testProject', description: 'testDescriptiopn' };
		const savedProject = await createProject(project.idea, project.description, user.id);

		const response = await request.get(`/projects/${savedProject.id}`);

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no project id is passed to getSingleProject', async () => {
		const response = await request.get(`/projects/${0}`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 401 unauthorized if projeect does not belong to user', async () => {
		const project: BaseProject = { idea: 'testProject', description: 'testDescriptiopn' };
		const savedProject = await createProject(project.idea, project.description, user2.id);

		const response = await request.get(`/projects/${savedProject.id}`).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it('should return 404 not found if project does not exist when calling getSingleProject', async () => {
		const response = await request.get(`/projects/404`).set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should return a single requested project', async () => {
		const project: BaseProject = { idea: 'testProject', description: 'testDescriptiopn' };
		const savedProject = await createProject(project.idea, project.description, user.id);

		const response = await request.get(`/projects/${savedProject.id}`).set('authorization', authHeader);

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('project');
	});

	// // createUserProject;
	it('should return 401 unauthorized if no authHeader is passed to createUserProject', async () => {
		const response = await request.post('/projects');

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no idea or description is passed to createUserProject', async () => {
		const projectInput: BaseProject = { idea: 'testProject', description: 'testDescription' };

		const response1 = await request
			.post('/projects')
			.set('authorization', authHeader)
			.send({ idea: projectInput.idea, description: '' });

		expect(response1.status).toBe(400);

		const response2 = await request
			.post('/projects')
			.set('authorization', authHeader)
			.send({ idea: '', description: projectInput.description });

		expect(response2.status).toBe(400);
	});

	it('it should create a new project', async () => {
		const projectInput: BaseProject = { idea: 'testProject', description: 'testDescription' };

		const response = await request
			.post('/projects')
			.set('authorization', authHeader)
			.send({ idea: projectInput.idea, description: projectInput.description });

		const [result] = await db.query(`select * from projects where idea = '${projectInput.idea}'`);

		expect(result).toBeTruthy();
	});

	// updateUserProject
	it('should return 401 unauthorized if no authHeader is passed to updateUserProject', async () => {
		const response = await request.patch('/projects/1');

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no new idea OR description is passed to updateUserProject', async () => {
		const response = await request.patch('/projects/1').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 400 bad input if no projectId is passed to updateUserProject', async () => {
		const response = await request
			.patch('/projects/0')
			.set('authorization', authHeader)
			.send({ idea: 'newProjectIdea' });

		expect(response.status).toBe(400);
	});

	it('should return 401 unauthorized if project does not belong to user', async () => {
		const project = await createProject('testProject', 'testDescription', user2.id);

		const response = await request
			.patch(`/projects/${project.id}`)
			.set('authorization', authHeader)
			.send({ idea: 'newProjectIdea' });

		expect(response.status).toBe(401);
	});

	it('should return 404 not found if project does not exist when calling updateUserProject', async () => {
		const response = await request
			.patch(`/projects/404`)
			.set('authorization', authHeader)
			.send({ idea: 'newProjectIdea' });

		expect(response.status).toBe(404);
	});

	it('should update a project with new idea, description, or both', async () => {
		const project = await createProject('testProject', 'testDescription', user.id);

		const response1 = await request
			.patch(`/projects/${project.id}`)
			.set('authorization', authHeader)
			.send({ idea: 'newIdea' });

		expect(response1.status).toBe(200);

		expect(response1.body).toHaveProperty('project');
		const { project: updatedProject1 } = response1.body as { project: BaseProject };
		expect(updatedProject1.idea).toEqual('newIdea');

		const response2 = await request
			.patch(`/projects/${project.id}`)
			.set('authorization', authHeader)
			.send({ description: 'newDescription' });

		expect(response2.status).toBe(200);
		expect(response2.body).toHaveProperty('project');
		const { project: updatedProject2 } = response2.body as { project: BaseProject };
		expect(updatedProject2.description).toEqual('newDescription');

		const response3 = await request
			.patch(`/projects/${project.id}`)
			.set('authorization', authHeader)
			.send({ idea: 'newerIdea', description: 'newerDescription' });

		expect(response3.status).toBe(200);
		expect(response3.body).toHaveProperty('project');
		const { project: updatedProject3 } = response3.body as { project: BaseProject };
		expect(updatedProject3.idea).toEqual('newerIdea');
		expect(updatedProject3.description).toEqual('newerDescription');
	});

	// // deleteUserProject;
	it('should return 401 unauthorized if no authHeader is passed to deleteUserProject', async () => {
		const response = await request.delete('/projects/401');

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no projectId is passed to deleteUserProject', async () => {
		const response = await request.delete('/projects/0').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 401 unauthorized if project does not belong to user', async () => {
		const project = await createProject('testProject', 'testDescription', user2.id);

		const response = await request.delete(`/projects/${project.id}`).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it('should return 404 not found if project does not exist when calling deleteUserProject', async () => {
		const response = await request.delete('/projects/404').set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should delete a project', async () => {
		const project = await createProject('testProject', 'testDescription', user.id);

		const response = await request.delete(`/projects/${project.id}`).set('authorization', authHeader);

		expect(response.status).toBe(200);

		const [result] = await db.query(`select * from projects where id = '${project.id}'`);

		expect(result).toHaveLength(0);
	});

	// // addGoalToProject;
	it('should return 401 unauthorized if no authHeader is passed to addGoalToProject', async () => {
		const response = await request.patch('/projects/123/goal');

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no projectId is passed to addGoalToProject', async () => {
		const response = await request.patch('/projects/0/goal').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 400 bad input if no goalId is passed to addGoalToProject', async () => {
		const project = await createProject('testProject', 'testDescription', user.id);

		const response = await request.patch(`/projects/${project.id}/goal`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 not found if goal does not exist when calling addGoalToProject', async () => {
		const project = await createProject('testProject', 'testDescription', user.id);

		const response = await request
			.patch(`/projects/${project.id}/goal`)
			.set('authorization', authHeader)
			.send({ goalId: '404' });

		expect(response.status).toBe(404);
	});

	it('should return 404 not found if project does not exist when calling addGoalToProject', async () => {
		const response = await request.patch('/projects/404/goal').set('authorization', authHeader).send({ goalId: '999' });

		expect(response.status).toBe(404);
	});

	it('should return 401 unautorized if goal does not belong to user when adding goal to project', async () => {
		const goal = await createGoal('testGoal', user2.id);
		const project = await createProject('testProject', 'testDescription', user.id);

		const response = await request
			.patch(`/projects/${project.id}/goal`)
			.set('authorization', authHeader)
			.send({ goalId: goal.id });

		expect(response.status).toBe(401);
	});

	it('should return 401 unautorized if goal does not belong to user when adding goal to project', async () => {
		const goal = await createGoal('testGoal', user.id);
		const project = await createProject('testProject', 'testDescription', user2.id);

		const response = await request
			.patch(`/projects/${project.id}/goal`)
			.set('authorization', authHeader)
			.send({ goalId: goal.id });

		expect(response.status).toBe(401);
	});

	it('should add a goal to a project', async () => {
		const goal = await createGoal('testGoal', user.id);
		const project = await createProject('testProject', 'testDescription', user.id);

		const response = await request
			.patch(`/projects/${project.id}/goal`)
			.set('authorization', authHeader)
			.send({ goalId: goal.id });

		expect(response.status).toBe(200);

		const [[result]] = await db.query(`select * from projects where id = '${project.id}'`);

		const updatedProject = result as { goalId: number };
		expect(updatedProject.goalId).toEqual(goal.id);
	});
	// // removeGoalFromProject;
	it('should return 401 unauthorized if no authHeader is passed to removeGoalToProject', async () => {
		const response = await request.delete('/projects/123/goal');

		expect(response.status).toBe(401);
	});

	it('should return 400 bad input if no projectId is passed to removeGoalToProject', async () => {
		const response = await request.delete(`/projects/0/goal`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 not found if project does not exist when calling removeGoalToProject', async () => {
		const response = await request.delete('/projects/404/goal').set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should remove a goal from a project', async () => {
		const goal = await createGoal('testGoal', user.id);
		const project = await createProject('testProject', 'testDescription', user.id, goal.id);

		const response = await request.delete(`/projects/${project.id}/goal`).set('authorization', authHeader);

		expect(response.status).toBe(200);

		const [[result]] = await db.query(`select * from projects where id = '${project.id}'`);

		const withoutGoal = result as BaseProject & { goalId: number };

		expect(withoutGoal.goalId).toBeFalsy();
	});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.close();
	});
});
