import { authConstants } from './constants';

// split fetch requests into UserAPI module

export function signIn(username, password) {
	return async (dispatch) => {
		// starting request, show a spinner
		dispatch(request({ username }));
		try {
			const response = await fetch('http://localhost:3000/user/login', {
				method: 'POST',
				body: {
					username,
					password,
				},
			});
			if (response.ok) {
				const token = await response.json();
				// user logged in
				dispatch(success(token));
			} else {
				throw Error('login failed');
			}
		} catch (e) {
			// alert user that login failed
			dispatch(failure(error));
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

export function logout() {
	// remove token from localstorage...
	return { type: authConstants.LOGOUT };
}

export function signup(username, password) {
	return async (dispatch) => {
		// start request, show a spinner...
		dispatch(request(username));

		try {
			const response = await fetch('http://localhost:3000/user/signup', {
				method: 'POST',
				body: {
					username,
					password,
				},
			});

			if (response.ok) {
				// user signed up!
				const token = await response.json();
				dispatch(success(token));
			}
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
