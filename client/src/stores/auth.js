import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { authConstants } from '../actions/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.user,
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
			};
		case authConstants.LOGIN_FAILURE:
			return {};
		case authConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}

// function authReducer(state = { user: '' }, action) {
// 	switch (action.type) {
// 		case 'login':
// 			// implement auth workflow with thunks
// 			return { user: 'test' };
// 		case 'logout':
// 			// implement auth workflow with thunks
// 			return { user: '' };
// 		case 'signup':
// 			// implement auth workflow with thunks
// 			return { user: 'test' };
// 		default:
// 			return state;
// 	}
// }

const middlewares = applyMiddleware(reduxThunk);

export const authStore = createStore(authReducer, middlewares);

export const selectAuth = (state) => state.user;
