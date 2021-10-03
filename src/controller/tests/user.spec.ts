import { config } from 'dotenv';
config();
import { signUp } from '../user';
import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';

describe('user controller', () => {
	it('should create a user in the test db', async () => {
		const username = 'joeTest';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await signUp(username, password);
		const [query] = await sqlConnection.query('select * from "Users";');
		expect(query).toHaveLength(1);
	});

	it("should hash the user's password", async () => {
		const username = 'joeTest';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await signUp(username, password);
		expect(result.password).not.toEqual(password);
	});
});

afterAll(() => {
	sqlConnection.close();
});
