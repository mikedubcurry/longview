import { config } from 'dotenv';
config();
import { createUser, deleteUser } from '../user';
import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';

describe('user controller', () => {
	it('should create a user in the test db', async () => {
		const username = 'joeTest';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await createUser(username, password);
		const [query] = await sqlConnection.query('select * from "Users";');
		expect(query).toHaveLength(1);
	});

	it("should hash the user's password", async () => {
		const username = 'joeTest';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await createUser(username, password);
		expect(result.password).not.toEqual(password);
	});

	it('should delete a user', async () => {
		const userPass = 'deleteMe';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();

		await createUser(userPass, userPass);

		await deleteUser(userPass, userPass);
		const [result] = await sqlConnection.query(`select * from "Users" where username = 'deleteMe';`);
    expect(result).toHaveLength(0)
	});
});

afterAll(() => {
	sqlConnection.close();
});
