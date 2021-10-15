import { config } from 'dotenv';
config();
import { commparePassword, createUser, deleteUser, userExists } from '../user';
import { sqlConnection } from '../../db';
import { AuthError } from '../utlis';

const db = sqlConnection;
describe('user controller', () => {
	it('should create a user in the test db', async () => {
		const username = 'usertest1';
		const password = 'password';
		try {
			const result = await createUser(username, password);
			const [query] = await db.query("select * from users where username = 'usertest1';");
			expect(query).toHaveLength(1);
		} catch (e) {
			console.error(e);
		}
		await deleteUser(username, password);
	});

	it("should hash the user's password", async () => {
		const username = 'usertest2';
		const password = 'password';
		const result = await createUser(username, password);
		expect(result).toBeTruthy();
		expect(result.password).not.toEqual(password);
		await deleteUser(username, password);
	});

	it('should delete a user', async () => {
		const userPass = 'usertest3';

		let user = await createUser(userPass, userPass);
		if (user) {
			const result = await deleteUser(userPass, userPass);

			expect(result).toBe(1);
		} else {
			console.log(user);

			throw Error('something happened in the user controller tests: delete user...');
		}
	});

	it('should throw AuthError if to be deleted user does not exist', async () => {
		const username = 'usertest4';
		const password = 'doesntmatter';

		await expect(deleteUser(username, password)).rejects.toThrowError(AuthError);
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

	it('should throw if AuthError creating a user that already exists', async () => {
		const username = 'usertest7';
		const password = 'password';
		await createUser(username, password);

		await expect(createUser(username, password)).rejects.toThrowError(AuthError);
		await deleteUser(username, password);
	});

	afterAll(async () => {
		// await db.query('delete from users');
		await db.close();
	});
});
