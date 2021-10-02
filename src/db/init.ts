import { User, Project, Goal, Note } from '../model';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
	Note.sync({ alter: isDev });
	Project.sync({ alter: isDev });
	Goal.sync({ alter: isDev });
	User.sync({ alter: isDev });
};

export { dbInit };
