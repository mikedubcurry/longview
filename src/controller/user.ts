import { compareSync } from 'bcrypt';
import { User } from '../model';
import { AuthError } from './utlis';

export async function commparePassword(username: string, password: string) {
	const user = await userExists(username);
	if (!user) return false;
	return compareSync(password, user.password);
}

export async function createUser(username: string, password: string) {
	// check if user exists first, throw if true, otherwise create user
	const exists = await userExists(username);
	if (!exists) {
		const user = new User({ username, password });
		return await user.save();
	} else {
		throw new AuthError('user already exists');
	}
}

export async function deleteUser(username: string, password: string) {
	const user = await userExists(username);
	if (!user) throw new AuthError(`user: ${username} does not exist`);
	if (compareSync(password, user.password)) {
		return await User.destroy({ where: { username } });
	} else throw new AuthError('incorrect username or password');
}

export async function userExists(username: string) {
	const user = await User.findOne({ where: { username } });
	return user;
}
