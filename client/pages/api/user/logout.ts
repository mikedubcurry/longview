import { NextApiRequest, NextApiResponse } from 'next';
import { clearUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
	clearUser(res);

	res.redirect(307, '/');
}
