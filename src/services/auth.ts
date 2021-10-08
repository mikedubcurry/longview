import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { getToken } from '../middleware';

import { createUser, userExists, deleteUser as delUser } from '../controller/user';

export async function logIn(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'must supply both username and password' });
	}
	const user = await userExists(username);

	if (!user) {
		return res.status(401).json({ message: 'incorrect username or password' });
	}
	const passwordsMatch = compareSync(password, user.password);

	if (!passwordsMatch) {
		return res.status(401).json({ message: 'incorrect username or password' });
	}

	const token = sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!, {
		expiresIn: 3600000,
	});

	return res.status(200).json({ token });
}

export async function signUp(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'must supply both username and password' });
	}
	const isUser = await userExists(username);
	if (isUser) {
		return res.status(400).json({ message: 'user already exists' });
	}
	if (password.length < 8 || username.length < 8) {
		return res.status(400).json({ message: 'passwords and usernames must both contain at least 8 characters each' });
	}
	try {
		const user = await createUser(username, password);

		const token = sign({ username: user.username, id: user.id }, process.env.JWT_SECRET!, {
			expiresIn: 3600000,
		});

		return res.status(200).json({ token });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: e });
	}
}

export async function deleteUser(req: Request, res: Response) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'must supply both username and password' });
	}
	const authHeader = req.headers['authorization'] as string;
	const token = getToken(authHeader);

	try {
		// decode token and use decoded token to query db. return 401 if decoded token is not connected to db
		const tokenUser = verify(token, process.env.JWT_SECRET!);
		if (tokenUser && typeof tokenUser !== 'string' && tokenUser.username) {
			const isTokenUser = await userExists(tokenUser.username);

			if (!isTokenUser) {
				return res.status(401).json({ message: 'user does not exist' });
			}
		} else {
			throw Error('jwt token error');
		}
	} catch (e) {
		console.error(e);
		return res.status(500).send(e);
	}

	const isUser = await userExists(username);
	if (!isUser) {
		return res.status(401).json({ message: 'user does not exist' });
	}

	const passwordsMatch = compareSync(password, isUser.password);

	if (passwordsMatch) {
		const deleted = await delUser(username, password);
		if (deleted) {
			return res.status(200).json({ message: `deleted user: ${username}` });
		} else {
			return res.status(500).json({ message: `error deleting user: ${username}` });
		}
	} else {
		return res.status(401).json({ message: 'incorrect username or password' });
	}
}
