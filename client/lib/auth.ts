import { NextApiResponse } from 'next';
import { serialize } from 'cookie';

const cookieOptions = {
	httpOnly: true,
	maxAge: 2592000,
	path: '/',
	sameSite: 'Strict',
	secure: process.env.NODE_ENV === 'production',
};

function setCookie(res: any, name: string, value: string, options: Record<string, unknown> = {}): void {
	const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

	res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
}

export function authenticateUser(res: NextApiResponse, token: string): void {
	if (!token) return;

	setCookie(res, 'auth', token, cookieOptions);
}

export function clearUser(res: NextApiResponse): void {
	setCookie(res, 'auth', '', {
		...cookieOptions,
		path: '/',
		maxAge: 1,
	});
}
