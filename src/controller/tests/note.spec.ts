import { config } from 'dotenv';
config();
import { createUser } from '../user';
import { createProject } from '../project';
import { sqlConnection } from '../../db';

const db = sqlConnection;

let user: { id: number };
let project: { id: number };

describe('note controller', () => {
	beforeAll(async () => {
		user = await createUser('notecontroller', 'notecontroller');
		project = await createProject('noteController', 'noteController', user.id);
	});

	afterEach(async () => {
		await db.query('delete from projects');
	});

	// createNote
	it('should throw BadInputError if no text passed to createNote', async () => {});

	it('should throw BadInputError if no projectId is passed to createNote', async () => {});

	it('should throw BadInputError if no ownerId is passed to createNote', async () => {});

	it('should throw NonExistentError if project doesnt exist', async () => {});

	it('should throw AuthError if user doesnt exist', async () => {});

	it('should throw AuthError if project doesnt belong to user', async () => {});

	it('should add a note to a project', async () => {});

	// getProjectNotes
	it('should throw BadInputError if no projectId is passed to getProjectNotes', async () => {});

	it('should throw NonExistentError if project doesnt exist', async () => {});

	it('should throw AuthError if user doesnt exist', async () => {});

	it('should throw AuthError iif project doesnt belong to user', async () => {});

	it('should get all a projects notes', async () => {});

	// getUserNotes
	it('should throw AuthError if user doesnt exist calling getUserNotes', async () => {});

	it('should get all a users notes', async () => {});

	// updateNote
	it('should throw BadInputError if no new text is passed to updateNote', async () => {});

	it('should throw BadInputError if no noteId is passed to updateNote', async () => {});

	it('should throw AuthError if note does not belong to user', async () => {});

	it('should update a notes text', async () => {});

	// deleteNote
	it('should throw BadInputError if no noteId is passed to deleteNote', async () => {});

	it('should throw AuthError if note does not belong to user', async () => {});

	it('should delete a note', async () => {});

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
	});
});
