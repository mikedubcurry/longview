import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { userExists } from '../controller/user';

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

export async function signUp(req: Request, res: Response) {}

export async function logOut(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}
