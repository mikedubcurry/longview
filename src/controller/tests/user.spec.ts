import { config } from 'dotenv';
config();
import { commparePassword, createUser, deleteUser, userExists } from '../user';
import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';
import { assert } from 'console';

describe('user controller', () => {
	it('should create a user in the test db', async () => {
		const username = 'joeTest';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await createUser(username, password);
		const [query] = await sqlConnection.query('select * from users;');
		expect(query).toHaveLength(1);
	});

	it("should hash the user's password", async () => {
		const username = 'jotoro';
		const password = 'password';
		await sqlConnection.authenticate({ logging: false });
		await dbInit();
		const result = await createUser(username, password);
		expect(result.password).not.toEqual(password);
	});

	it('should delete a user', async () => {
		const userPass = 'deleteMe';
		await sqlConnection.authenticate({ logging: false });
		await sqlConnection.sync({ force: true, alter: true });

		await createUser(userPass, userPass);

		await deleteUser(userPass, userPass);
		const [result] = await sqlConnection.query(`select "deletedAt" from users where username = 'deleteMe';`);

		expect(result).toHaveLength(1);
	});

	it('should throw if to be deleted user does not exist', async () => {
		await sqlConnection.authenticate({ logging: false });
		await sqlConnection.sync({ force: true, alter: true });
		const username = 'mike';
		const password = 'doesntmatter';

		await expect(deleteUser(username, password)).rejects.toThrow();
	});

	it('should check if a user exists', async () => {
		await sqlConnection.authenticate({ logging: false });
		await sqlConnection.sync({ force: true, alter: true });
		const username = 'jotoro';
		const password = 'password';
		await createUser(username, password);

		let exists = await userExists(username);

		expect(exists).toBeTruthy();

		let doesNotExist = await userExists('dio');

		expect(doesNotExist).toBeFalsy();
	});

	it('should return true if username and password match', async () => {
		await sqlConnection.authenticate({ logging: false });
		await sqlConnection.sync({ force: true, alter: true });
		const username = 'jotoro';
		const password = 'jojo';
		await createUser(username, password);

		let passwordsMatch = await commparePassword(username, password);

		expect(passwordsMatch).toEqual(true);

		let passwordsDontMatch = await commparePassword('username', 'dio');

		expect(passwordsDontMatch).toEqual(false);
	});
});

afterAll(() => {
	sqlConnection.close();
});
