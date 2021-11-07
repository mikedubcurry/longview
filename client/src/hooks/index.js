import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authContext } from '../context';

import { selectAuth } from '../stores';

export function useAuth() {
	return useContext(authContext);
}

export function useProvideAuth() {
	// const [user, setUser] = useState(null);
	const auth = useSelector(selectAuth);
	const dispatch = useDispatch();

	const signin = (cb) => {
		dispatch({ type: 'login' });
		// return fakeAuth.signin(() => {
		// 	setUser('user');
		// 	cb();
		// });
	};

	const signout = (cb) => {
		dispatch({ type: 'logout' });
		// return fakeAuth.signout(() => {
		// 	setUser(null);
		// 	cb();
		// });
	};

	return {
		user: auth,
		signin,
		signout,
	};
}

// const fakeAuth = {
// 	isAuthenticated: false,
// 	signin(cb) {
// 		fakeAuth.isAuthenticated = true;
// 		setTimeout(cb, 100); // fake async
// 	},
// 	signout(cb) {
// 		fakeAuth.isAuthenticated = false;
// 		setTimeout(cb, 100);
// 	},
// };
