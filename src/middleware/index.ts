import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET!;

export function useTokenAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		return res.status(401).json({ error: 'unauthorized' });
	}
	// return headers.authorization string after 'Bearer '...
	const token = getToken(req.headers.authorization);
	try {
		let tokenIsValid = verify(token, jwtSecret);
		if (tokenIsValid) {
			// token is good, carry on
			next();
		} else {
			return res.status(401).json({ error: 'unauthorized' });
		}
	} catch (e) {
		console.log(e);
		next(e);
	}
}

export function getToken(authHeader: string) {
	if (!authHeader) throw Error('expexted authHeader to be a string');
	if (!authHeader.includes('Bearer')) throw Error('expected authHeader to contain a Bearer token');
	if (authHeader.length < 7) throw Error('must supply a token in the auth header');
	// 7 because that starts the token after 'Bearer '...
	return authHeader.slice(7);
}
