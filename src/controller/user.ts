import { User } from '../model';

export async function logIn(username: string, password: string) {}

export async function createUser(username: string, password: string) {
	const user = new User({ username, password });

	return await user.save();
}

export async function deleteUser(username: string, password: string) {
	return await User.destroy({ where: { username: username } });
}
