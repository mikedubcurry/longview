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

	it('should just pass...', () => {
		expect(true).toBe(true);
	});

	afterAll(async () => {
		await db.query(`delete from users where id = '${user.id}'`);
	});
});
