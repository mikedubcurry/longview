import { config } from 'dotenv';
config();
import { commparePassword, createUser, deleteUser, userExists } from '../user';
import { sqlConnection } from '../../db';
import { dbInit } from '../../db/init';

describe('user controller', () => {
	beforeAll((done) => {
		setUp(done);
	}, 10000);

	afterEach((done) => {
		cleanUp(done);
	}, 10000);

	afterAll((done) => {
		closeDb(done);
	}, 10000);
	it('should create a user in the test db', async () => {
		const username = 'joeTest';
		const password = 'password';
		const result = await createUser(username, password);
		const [query] = await sqlConnection.query('select * from users;');
		expect(query).toHaveLength(1);
	}, 10000);

	it("should hash the user's password", async () => {
		const username = 'jotoro';
		const password = 'password';
		const result = await createUser(username, password);
		expect(result.password).not.toEqual(password);
	}, 10000);

	it('should delete a user', async () => {
		const userPass = 'deleteMe';

			await createUser(userPass, userPass);

			const result = await deleteUser(userPass, userPass);

			expect(result).toBe(1);
			// done();
		
	}, 10000);

	it('should throw if to be deleted user does not exist', async () => {
		const username = 'mike';
		const password = 'doesntmatter';

		await expect(deleteUser(username, password)).rejects.toThrow();
	}, 10000);

	it('should check if a user exists', async () => {
		const username = 'jotoro';
		const password = 'password';
		await createUser(username, password);

		let exists = await userExists(username);

		expect(exists).toBeTruthy();

		let doesNotExist = await userExists('dio');

		expect(doesNotExist).toBeFalsy();
	}, 10000);

	it('should return true if username and password match', async () => {
		const username = 'jotoro';
		const password = 'jojo';
		await createUser(username, password);

		let passwordsMatch = await commparePassword(username, password);

		expect(passwordsMatch).toEqual(true);

		let passwordsDontMatch = await commparePassword('username', 'dio');

		expect(passwordsDontMatch).toEqual(false);
	}, 10000);
});

function setUp(done: jest.DoneCallback) {
	sqlConnection.authenticate().then(() => {
		// sqlConnection.sync({ force: true, alter: true }).then(() => {
		// 	done();
		// });
		dbInit().then(() => {
			done();
		});
	});
}

function cleanUp(done: jest.DoneCallback) {
	sqlConnection.query('delete from users;').then((d) => {
		// sqlConnection.close().then(() => {
		// 	done();
		// });
		done();
	});
}

function closeDb(done: jest.DoneCallback) {
	sqlConnection.close().then(() => {
		done();
	});
}
