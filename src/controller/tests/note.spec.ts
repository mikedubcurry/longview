import { config } from 'dotenv';
config();
import { createUser } from '../user';
import { createProject } from '../project';
import { sqlConnection } from '../../db';
import { createNote, deleteNote, getProjectNotes, getUserNotes, updateNote } from '../note';
import { AuthError, BadInputError, NonExistentError } from '../utlis';

const db = sqlConnection;

let user: { id: number };
let user2: { id: number };
let project: { id: number };

describe('note controller', () => {
	beforeAll(async () => {
		user = await createUser('notecontroller', 'notecontroller');
		user2 = await createUser('noteController2', 'noteController2');
		project = await createProject('noteController', 'noteController', user.id);
	});

	afterEach(async () => {
		// await db.query('delete from projects');
		await db.query('delete from notes');
	});

	// createNote
	it('should throw BadInputError if no text passed to createNote', async () => {
		const text = '';

		await expect(createNote(text, project.id, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no projectId is passed to createNote', async () => {
		const text = 'testNote';

		await expect(createNote(text, 0, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no ownerId is passed to createNote', async () => {
		const text = 'testNote';

		await expect(createNote(text, project.id, 0)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if project doesnt exist', async () => {
		const text = 'testNote';

		await expect(createNote(text, 404, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if project doesnt belong to user', async () => {
		const text = 'testNote';

		await expect(createNote(text, project.id, user2.id)).rejects.toThrowError(AuthError);
	});

	it('should add a note to a project', async () => {
		const note = await createNote('testNote', project.id, user.id);

		const [result] = await db.query(`select * from notes where "projectId" = '${project.id}'`);
		const [result2] = await db.query(`select * from projects where id = '${project.id}'`);
		const [noteOnProject] = result as { id: number; text: string; projectId: number }[];
		const [projectWithNote] = result2 as { id: number }[];

		expect(noteOnProject.projectId).toEqual(projectWithNote.id);
	});

	// getProjectNotes
	it('should throw BadInputError if no projectId is passed to getProjectNotes', async () => {
		await expect(getProjectNotes(NaN, user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw NonExistentError if project doesnt exist', async () => {
		await expect(getProjectNotes(404, user.id)).rejects.toThrowError(NonExistentError);
	});

	it('should throw AuthError if user doesnt exist', async () => {
		await expect(getProjectNotes(project.id, 401)).rejects.toThrowError(AuthError);
	});

	it('should throw AuthError if project doesnt belong to user', async () => {
		await expect(getProjectNotes(project.id, user2.id)).rejects.toThrowError(AuthError);
	});

	it('should get all a projects notes', async () => {
		const notes = ['testNote1', 'testNote2', 'testNote3'];

		await Promise.all(
			notes.map((text) => {
				return createNote(text, project.id, user.id);
			})
		);

		const projectNotes = await getProjectNotes(project.id, user.id);

		expect(projectNotes).toHaveLength(3)
	});

	// getUserNotes
	it('should throw AuthError if user doesnt exist calling getUserNotes', async () => {
		await expect(getUserNotes(401)).rejects.toThrowError(AuthError);
	});

	it('should get all a users notes', async () => {
		const notes = ['testNote1', 'testNote2', 'testNote3'];

		await Promise.all(
			notes.map((text) => {
				return createNote(text, project.id, user.id);
			})
		);

		const userNotes = await getUserNotes(user.id);

		expect(userNotes).toHaveLength(3)
	});

	// updateNote
	it('should throw BadInputError if no new text is passed to updateNote', async () => {
		const note = await createNote('testNote', project.id, user.id);

		await expect(updateNote(note.id, 'newTestNote', user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw BadInputError if no noteId is passed to updateNote', async () => {
		await expect(updateNote(400, 'newTestNote', user.id)).rejects.toThrowError(BadInputError);
	});

	it('should throw AuthError if note does not belong to user', async () => {
		const note = await createNote('testNote', project.id, user.id);

		await expect(updateNote(note.id, 'newTestNote', user2.id)).rejects.toThrowError(AuthError);
	});

	it('should update a notes text', async () => {
		const note = await createNote('testNote', project.id, user.id);
		const newNoteText = 'newTestNote';
		const updated = await updateNote(note.id, 'newTestNote', user.id);

		const [result] = await db.query(`select * from notes where id = '${note.id}'`);
		const [updatedNote] = result as { id: number; text: string }[];

		expect(updatedNote.text).toEqual(newNoteText);
	});

	// // deleteNote
	// it('should throw BadInputError if no noteId is passed to deleteNote', async () => {
	// 	await expect(deleteNote(400, user.id)).rejects.toThrowError(BadInputError);
	// });

	// it('should throw AuthError if note does not belong to user', async () => {
	// 	const note = await createNote('testNote', project.id, user.id);

	// 	await expect(deleteNote(note.id, user2.id)).rejects.toThrowError(AuthError);
	// });

	// it('should delete a note', async () => {
	// 	const note = await createNote('testNote', project.id, user.id);

	// 	const deleted = await deleteNote(note.id, user.id);

	// 	expect(deleted).toBeTruthy();

	// 	const [result] = db.query(`select * from notes where id = '${note.id}'`);

	// 	expect(result.length).toBe(0);
	// });

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
		await db.query(`delete from users where id = '${user2.id}'`);
	});
});
