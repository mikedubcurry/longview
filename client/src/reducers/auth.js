import { authConstants } from '../actions/constants';

let user = JSON.parse(localStorage.getItem(import.meta.env.VITE_userTokenKey));

const initialState = user ? { loggedIn: true, user } : {};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				username: action.username,
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				token: action.token,
			};
		case authConstants.LOGIN_FAILURE:
			return {};
		case authConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}
