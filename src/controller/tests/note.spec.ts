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

	it('should just pass...', () => {
		expect(true).toBe(true);
	});
});
