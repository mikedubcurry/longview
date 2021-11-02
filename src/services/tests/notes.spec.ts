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
	it('should return 401 unauthorized if no authHeader is passed to getUserNotes', async () => {
		const response = await request.get('/notes');
		expect(response.status).toBe(401);
	});

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
	it('should return 401 unauthorized if no authHeader is passed', async () => {
		const response = await request.get('/notes/401');

		expect(response.status).toBe(401);
	});

	it('should return 400 badInput if no valid projectId is passed', async () => {
		const response = await request.get(`/notes/hmm`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 not found if project does not exist', async () => {
		const response = await request.get(`/notes/404`).set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should return 401 unauthorized if project does not belong to user', async () => {
		const response = await request.get(`/notes/${user2Project.id}`).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it("should return all a project's notes", async () => {
		const testNotes = ['testNote1', 'testNote2', 'testNote3'];
		// bulk create notes
		await Promise.all(
			testNotes.map((note) => {
				return createNote(note, project.id, user.id);
			})
		);

		const response = await request.get(`/notes/${project.id}`).set('authorization', authHeader);

		expect(response.body).toHaveProperty('notes');
		expect(response.body.notes).toHaveLength(3);
	});

	// createNote
	it('should return 401 unauthorized if no authHeader is passed', async () => {
		const response = await request.post('/notes').send({ text: 'hmm' });

		expect(response.status).toBe(401);
	});

	it('should return 400 badInput if no valid projectId is passed', async () => {
		const response = await request.post('/notes/asdf').send({ text: 'asdf' }).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 400 badInput if no text is passed', async () => {
		const response = await request.post(`/notes/${project.id}`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 if project does not exist', async () => {
		const response = await request.post('/notes/404').send({ text: 'asdf' }).set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should return 401 unauthorized if project does not belong to user', async () => {
		const response = await request
			.post(`/notes/${user2Project.id}`)
			.send({ text: 'test' })
			.set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it('should create a new note under a project', async () => {
		const response = await request.post(`/notes/${project.id}`).send({ text: 'test' }).set('authorization', authHeader);

		const resultResponse = await request.get(`/notes/${project.id}`).set('authorization', authHeader);

		expect(resultResponse.body.notes).toHaveLength(1);
	});

	// updateNote
	it('should return 401 unauthorized if no authHeader is passed', async () => {
		const response = await request.patch('/notes/401').send({ text: 'hmm' });

		expect(response.status).toBe(401);
	});

	it('should return 400 badInput if no updated text is passed', async () => {
		const response = await request.patch(`/notes/400`).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 400 badInput if no valid noteId is passed', async () => {
		const response = await request.patch(`/notes/test`).send({ text: 'test' }).set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 if note does not exist', async () => {
		const response = await request.patch(`/notes/404`).send({ text: 'test' }).set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should return 401 if notes does not belong to user', async () => {
		const note = await createNote('before', secondProject.id, user2.id);
		const response = await request.patch(`/notes/${note.id}`).send({ text: 'test' }).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it("should update a note's text", async () => {
		const note = await createNote('before', project.id, user.id);

		const response = await request.patch(`/notes/${note.id}`).send({ text: 'after' }).set('authorization', authHeader);

		const resultResponse = await request.get(`/notes/${note.id}`).set('authorization', authHeader);

		expect(resultResponse.body.note.text).toEqual('after');
	});

	// deleteNote
	it('should return 401 unauthorized if no authHeader is passed', async () => {
		const response = await request.delete('/notes/401');

		expect(response.status).toBe(401);
	});

	it('should return 400 if no valid noteId is passed', async () => {
		const response = await request.delete('/notes/test').set('authorization', authHeader);

		expect(response.status).toBe(400);
	});

	it('should return 404 if note does not exist', async () => {
		const response = await request.delete('/notes/404').set('authorization', authHeader);

		expect(response.status).toBe(404);
	});

	it('should return 401 if note does not belong to user', async () => {
		const note = await createNote('test', secondProject.id, user2.id);

		const response = await request.delete(`/notes/${note.id}`).set('authorization', authHeader);

		expect(response.status).toBe(401);
	});

	it('should delete a note', async () => {
		const note = await createNote('test', project.id, user.id);

		const response = await request.delete(`/notes/${note.id}`).set('authorization', authHeader);

		const result = await request.get(`/notes/${project.id}`).set('authorization', authHeader);

		expect(result.body.notes).toHaveLength(0);
	});

	afterAll(async () => {
		await deleteUser(testUser.username, testUser.password);
		await deleteUser(altUser.username, altUser.password);
		await db.query(`delete from projects where id = '${project.id}'`);
		await db.query(`delete from projects where id = '${secondProject.id}'`);
		await db.query(`delete from projects where id = '${user2Project.id}'`);
		await db.query(`delete from notes`);
		await db.close();
	});
});
