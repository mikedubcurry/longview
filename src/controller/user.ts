import { compareSync } from 'bcrypt';
import { User } from '../model';

export async function commparePassword(username: string, password: string) {
	const user = await userExists(username);
	if (!user) return false;
	return compareSync(password, user.password);
}

export async function createUser(username: string, password: string) {
	const user = new User({ username, password });

	return await user.save();
}

export async function deleteUser(username: string, password: string) {
	const exists = await userExists(username);
	if (!exists) throw new Error(`user: ${username} does not exist`);
	return await User.destroy({ where: { username: username } });
}

export async function userExists(username: string) {
	const user = await User.findOne({ where: { username } });
	return user;
}
