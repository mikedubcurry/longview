import { config } from 'dotenv';
config()
import { sign } from 'jsonwebtoken';
import supertest from 'supertest';

import { app } from '../app';
import { getToken } from './index';

const request = supertest(app);

describe('token middleware', () => {
	it('should take a Bearer token as input', () => {
		let validToken = 'Bearer i-am-a-valid-token';
		let invalidToken1 = 'i-will-cause-an-issue';
		let invalidToken2 = 'me-too';
		let invalidToken3 = { token: 'Bearer 8675309' } as unknown as string;

		expect(getToken(validToken)).toEqual('i-am-a-valid-token');
		expect(() => getToken(invalidToken1)).toThrow();
		expect(() => getToken(invalidToken2)).toThrow();
		expect(() => getToken(invalidToken3)).toThrow();
	});
	it('should return 401 if token does not correspond with an active user', async () => {
		// token for user that doesnt exist in db
		const token = sign({ username: 'hacker', id: 69 }, process.env.JWT_SECRET!);

		const response = await request.delete('/user').set({ authorization: `Bearer ${token}` });

		expect(response.status).toBe(401);
	});
});
