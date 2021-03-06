import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { User } from '../model';

const jwtSecret = process.env.JWT_SECRET!;

export async function useTokenAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'unauthorized' });
	}
	// return headers.authorization string after 'Bearer '...
	try {
		const token = getToken(req.headers.authorization);
		let tokenIsValid = verify(token, jwtSecret) as UsernameAndId;
		if (tokenIsValid && typeof tokenIsValid !== 'string' && tokenIsValid.id) {
			const userExists = await User.findOne({ where: { id: tokenIsValid.id } });

			if (!userExists) {
				return res.status(401).json({ message: 'unathorized' });
			}
			// 		if (tokenUser && typeof tokenUser !== 'string' && tokenUser.username) {

			// should check to make sure token corresponds to an active user

			// token is good, carry on
			req.user = { id: tokenIsValid.id };
			next();
		} else {
			return res.status(401).json({ message: 'unauthorized' });
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'something went wrong' });
		// next(e);
	}
}

export function getToken(authHeader: string) {
	if (!authHeader) throw Error('expexted authHeader to be a string');
	if (!authHeader.includes('Bearer')) throw Error('expected authHeader to contain a Bearer token');
	if (authHeader.length < 7) throw Error('must supply a token in the auth header');
	// 7 because that starts the token after 'Bearer '...
	return authHeader.slice(7);
}

export function getUser(authHeader: string) {
	const token = getToken(authHeader);
	const usernameAndId = verify(token, process.env.JWT_SECRET!) as UsernameAndId;
	return usernameAndId;
}

interface UsernameAndId {
	username: string;
	id: number;
}
