import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
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
	it('should return 401 unauthorized if no authHeader is passed to getUserProjects', async () => {});

	it('should return an array of user projects', async () => {});

	// getSingleProject;
	it('should return 401 unauthorized if no authHeader is passed to getSingleProject', async () => {});

	it('should return 400 bad input if no project id is passed to getSingleProject', async () => {});

	it('should return 401 unauthorized if projeect does not belong to user', async () => {});

	it('should return 404 not found if project does not exist when calling getSingleProject', async () => {});

	it('should return a single requested project', async () => {});

	// createUserProject;
	it('should return 401 unauthorized if no authHeader is passed to createUserProject', async () => {});

	it('should return 400 bad input if no idea or description is passed to createUserProject', async () => {});

	it('it should create a new project', async () => {});

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
