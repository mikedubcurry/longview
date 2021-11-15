import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authContext } from '../context';
import { authConstants } from '../actions/constants';
import { selectAuth } from '../stores';

export function useAuth() {
	return useContext(authContext);
}

export function useProvideAuth() {
	const auth = useSelector(selectAuth);
	const dispatch = useDispatch();

	const login = (cb) => {
		console.log('trying to log in');
	};

	const logout = (cb) => {
		console.log('trying to log out');
	};

	return {
		user: auth,
		login,
		logout,
	};
}
