import { authConstants } from '../actions/constants';

const userStorageKey = import.meta.env.VITE_userStorageKey;
let user = JSON.parse(localStorage.getItem(userStorageKey));
const initialState = user ? { loggedIn: true, token: user } : {};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				pending: true,
				username: action.payload.username,
			};

		case authConstants.LOGIN_SUCCESS:
			localStorage.setItem(userStorageKey, JSON.stringify(action.payload.token));

			return {
				loggedIn: true,
				token: action.payload.token,
			};

		case authConstants.LOGIN_FAILURE:
			return {};

		case authConstants.LOGOUT:
			localStorage.removeItem(userStorageKey);

			return {};

		case authConstants.SIGNUP_REQUEST:
			return {
				pending: true,
				username: action.payload.username,
			};

		case authConstants.SIGNUP_SUCCESS:
			localStorage.setItem(userStorageKey, JSON.stringify(action.payload.token));

			return {
				loggedIn: true,
				token: action.payload.token,
			};

		case authConstants.SIGNUP_FAILURE:
			return {};

		default:
			return state;
	}
}
