import { authConstants } from '../actions/constants';

let user = JSON.parse(localStorage.getItem(import.meta.env.VITE_userTokenKey));

const initialState = user ? { loggedIn: true, user } : {};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				pending: true,
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

		case authConstants.SIGNUP_REQUEST:
			return {
				pending: true,
				username: action.username,
			};
		case authConstants.SIGNUP_SUCCESS:
			return {
				loggedIn: true,
				token: action.token,
			};
		case authConstants.SIGNUP_FAILURE:
			return {};

		default:
			return state;
	}
}
