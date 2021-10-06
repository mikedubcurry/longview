import { Request, Response } from 'express';

export async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'must supply both username and password' });
	}
}

export async function signUp(req: Request, res: Response) {}

export async function logOut(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}