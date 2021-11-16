import authApi from '../apis/auth';
import { authConstants } from './constants';

export function signIn(username, password) {
	console.log('test');
	return async (dispatch) => {
		// starting request, show a spinner
		dispatch(request({ username }));
		try {
			const token = await authApi.login(username, password);
			// user logged in!
			dispatch(success(token));
		} catch (e) {
			// alert user that login failed
			dispatch(failure(e));
		}
	};

	function request(user) {
		return { type: authConstants.LOGIN_REQUEST, user };
	}
	function success(token) {
		return { type: authConstants.LOGIN_SUCCESS, token };
	}
	function failure(error) {
		return { type: authConstants.LOGIN_FAILURE, error };
	}
}

export function signOut() {
	// remove token from localstorage...
	const loggedOut = authApi.logout();
	return { type: authConstants.LOGOUT };
}

export function signup(username, password) {
	return async (dispatch) => {
		// start request, show a spinner...
		dispatch(request(username));

		try {
			const token = await authApi.signup(username, password);
			// user signed up!
			dispatch(success(token));
		} catch (e) {
			// alert user signup failed...
			dispatch(failure(e));
		}
	};

	function request(user) {
		return { type: authConstants.SIGNUP_REQUEST, user };
	}
	function success(token) {
		return { type: authConstants.SIGNUP_SUCCESS, token };
	}
	function failure(error) {
		return { type: authConstants.SIGNUP_FAILURE, error };
	}
}