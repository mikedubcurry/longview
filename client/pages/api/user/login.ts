import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '../../../lib/auth';

type AuthData = { token: string } | { error: { message: string } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthData>) {
	if (!req.body) {
		return res.status(400).json({ error: { message: 'must supply credentials' } });
	}

	try {
		const unCheckedInput = JSON.parse(req.body);

		if (!unCheckedInput.username || !unCheckedInput.password) {
			return res.status(400).json({ error: { message: 'must supply credentials' } });
		}
		const input = { username: unCheckedInput.username, password: unCheckedInput.password };

		// change this to use an env var
		const response = await fetch(`http://localhost:3000/user/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});

		const data = await response.json();

		if (data.message) {
			return res.status(response.status).json({ error: data });
		}

		let { token } = data;

		authenticateUser(res, token);

		res.status(200).json({ token });
	} catch (e) {
		console.log(e);

		res.status(500).json({ error: { message: 'something went wrong' } });
	}
}
