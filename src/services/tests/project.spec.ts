import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { app } from '../../app';
import { User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';
import { createProject } from '../../controller/project';

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
	});

	// getUserProjects
	it('should return 401 unauthorized if no authHeader is passed to getUserProjects', async () => {
		const response = await request.get('/projects').set('authorization', authHeader);

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

		expect(response.body).toHaveLength(3);
	});

	// getSingleProject;
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

	// createUserProject;
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
	it('should return 401 unauthorized if no authHeader is passed to updateUserProject', async () => {});

	it('should return 400 bad input if no new idea OR description is passed to updateUserProject', async () => {});

	it('should return 400 bad input if no projectId is passed to updateUserProject', async () => {});

	it('should return 401 unauthorized if project does not belong to user', async () => {});

	it('should return 404 not found if project does not exist when calling updateUserProject', async () => {});

	it('should update a project with new idea, description, or both', async () => {});

	// deleteUserProject;
	it('should return 401 unauthorized if no authHeader is passed to deleteUserProject', async () => {});

	it('should return 401 unauthorized if project does not belong to user', async () => {});

	it('should return 400 bad input if no projectId is passed to deleteUserProject', async () => {});

	it('should return 404 not found if project does not exist when calling deleteUserProject', async () => {});

	it('should delete a project', async () => {});

	// addGoalToProject;
	it('should return 401 unauthorized if no authHeader is passed to addGoalToProject', async () => {});

	it('should return 400 bad input if no goalId is passed to addGoalToPRoject', async () => {});

	it('should return 400 bad input if no projectId is passed to addGoalToProject', async () => {});

	it('should return 404 not found if goal does not exist when calling addGoalToProject', async () => {});

	it('should return 404 not found if project does not exist when calling addGoalToProject', async () => {});

	it('should add a goal to a project', async () => {});
	// removeGoalFromProject;
	it('should return 401 unauthorized if no authHeader is passed to removeGoalToProject', async () => {});

	it('should return 400 bad input if no goalId is passed to removeGoalToPRoject', async () => {});

	it('should return 400 bad input if no projectId is passed to removeGoalToProject', async () => {});

	it('should return 404 not found if project does not exist when calling removeGoalToProject', async () => {});

	it('should remove a goal from a project', async () => {});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.close();
	});
});
