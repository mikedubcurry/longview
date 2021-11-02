import supertest from 'supertest';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { sqlConnection } from '../../db';
import { app } from '../../app';
import { Project, User } from '../../model';
import { createUser, deleteUser } from '../../controller/user';
import { createProject } from '../../controller/project';
import { createNote } from '../../controller/note';

const request = supertest(app);

const db = sqlConnection;

const testUser = { username: 'testuser', password: 'password' };
const altUser = { username: 'testuser2', password: 'password' };
const testProject = { idea: 'testProject', description: 'testProject' };
let user: User;
let user2: User;
let authHeader: string;
let project: Project;
let secondProject: Project;
let user2Project: Project;

describe('notes service', () => {
	beforeAll(async () => {
		user = await createUser(testUser.username, testUser.password);
		user2 = await createUser(altUser.username, altUser.password);
		authHeader = 'Bearer ' + sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!);
		project = await createProject(testProject.idea, testProject.description, user.id);
		secondProject = await createProject(testProject.idea, testProject.description, user.id);
		user2Project = await createProject(testProject.idea, testProject.description, user2.id);
	});

	afterEach(async () => {
		await db.query('delete from notes');
	});

	it('should run notes service tests', async () => {
		expect(true).toBe(true);
	});

	// getNotes
	//   should return 401 unauthorized if no authHeader is passed
	it('should return 401 unauthorized if no authHeader is passed to getUserNotes', async () => {
		const response = await request.get('/notes');
		expect(response.status).toBe(401);
	});
	//   should return all a user's notes
	it("should return all a user's notes", async () => {
		const testNotes = ['testNote1', 'testNote2', 'testNote3'];
		// bulk create notes across two projects
		await Promise.all(
			testNotes.map((note) => {
				return createNote(note, project.id, user.id);
			})
		);
		await Promise.all(
			testNotes.map((note) => {
				return createNote(note, secondProject.id, user.id);
			})
		);

		const response = await request.get(`/notes/${project.id}`).set('authorization', authHeader);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('notes');
		const responseNotes = response.body as { notes: { text: string; projectId: number }[] };
		expect(responseNotes).toHaveLength(6);
	});

	// getProjectNotes
	//   should return 401 unauthorized if no authHeader is passed
	//   should return 400 badInput if no valid projectId is passed
	//   should return 404 not found if project does not exist
	//   should return 401 unauthorized if project does not belong to user
	//   should return all a project's notes

	// createNote
	//   should return 401 unauthorized if no authHeader is passed
	//   should return 400 badInput if no projectId is passed
	//   should return 400 badInput if no text is passed
	//   should return 404 if project does not exist
	//   should return 401 unauthorized if project does not belong to user
	//   should create a new note under a project

	// updateNote
	//   should return 401 unauthorized if no authHeader is passed
	//   should return 400 badInput if no updated text is passed
	//   should return 400 badInput if no projectId is passed
	//   should return 404 if note does not exist
	//   should return 401 if notes does not belong to user
	//   should update a note's text

	// deleteNote
	//   should return 401 unauthorized if no authHeader is passed
	//   should return 400 if no valid noteId is passed
	//   should return 404 if note does not exist
	//   should return 401 if note does not belong to user
	//   should delete a note

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.query(`delete from projects where id = '${project.id}'`);
		await db.query(`delete from notes`);
		await db.close();
	});
});
