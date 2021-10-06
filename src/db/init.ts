import { User, Project, Goal, Note } from '../model';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const dbInit = async () => {
	// force sync and alter tables if in dev or test
	await Note.sync({ alter: isDev || isTest, force: isTest });
	await Project.sync({ alter: isDev || isTest, force: isTest });
	await Goal.sync({ alter: isDev || isTest, force: isTest });
	await User.sync({ alter: isDev || isTest, force: isTest });
};

export { dbInit };
