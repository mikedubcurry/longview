import { verify } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type UserData = {
	user: {
		username: string;
		id: string;
	};
};

export default function handler(req: NextApiRequest, res: NextApiResponse<UserData | {}>) {
	const { auth } = req.cookies;
	if (auth) {
		const user = verify(auth, process.env.JWT_SECRET || '') as { username: string; id: string };

		return res.status(200).json({ user: { username: user.username, id: user.id } });
	}
	return res.status(200).json({});
}
