import { User } from '../model';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
	User.sync({ alter: isDev });
};

export { dbInit };
