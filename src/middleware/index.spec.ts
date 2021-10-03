import { getToken } from './index';

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
});
