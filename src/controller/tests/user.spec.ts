import { config } from 'dotenv';
config();
import { commparePassword, createUser, deleteUser, userExists } from '../user';
import { sqlConnection } from '../../db';
// import { dbInit } from '../../db/init';

const db = sqlConnection;

describe('user controller', () => {

	it('should create a user in the test db', async () => {
		const username = 'usertest1';
		const password = 'password';
		try {
			const result = await createUser(username, password);
			const [query] = await db.query('select * from users;');
			expect(query).toHaveLength(1);
			await deleteUser(username, password);
		} catch (e) {
			console.error(e);
		}
	});

	it("should hash the user's password", async () => {
		const username = 'usertest2';
		const password = 'password';
		const result = await createUser(username, password);
		expect(result.password).not.toEqual(password);
		await deleteUser(username, password);
	});

	it('should delete a user', async () => {
		const userPass = 'usertest3';

		let user = await createUser(userPass, userPass);
		if (user) {
			const result = await deleteUser(userPass, userPass);
			console.log(await db.query('select * from users;'));
			
			expect(result).toBe(1);
		} else {
			console.log(user);
			
			throw Error('something happened...');
		}
	});

	it('should throw if to be deleted user does not exist', async () => {
		const username = 'usertest4';
		const password = 'doesntmatter';

		await expect(deleteUser(username, password)).rejects.toThrow();
	});

	it('should check if a user exists', async () => {
		const username = 'usertest5';
		const password = 'password';
		await createUser(username, password);

		let exists = await userExists(username);

		expect(exists).toBeTruthy();

		let doesNotExist = await userExists('dio');

		expect(doesNotExist).toBeFalsy();
		await deleteUser(username, password);
	});

	it('should return true if username and password match', async () => {
		const username = 'usertest6';
		const password = 'jojo';
		await createUser(username, password);

		let passwordsMatch = await commparePassword(username, password);

		expect(passwordsMatch).toEqual(true);

		let passwordsDontMatch = await commparePassword('username', 'dio');

		expect(passwordsDontMatch).toEqual(false);
		await deleteUser(username, password);
	});

	afterAll(async () => {
		// await db.query('delete from users');
		await db.close();
	});
});
