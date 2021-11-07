import { createStore } from 'redux';

function authReducer(state = { user: '' }, action) {
	switch (action.type) {
		case 'login':
			// implement auth workflow with thunks
			return { user: 'test' };
		case 'logout':
			// implement auth workflow with thunks
			return { user: '' };
		case 'signup':
			// implement auth workflow with thunks
			return { user: 'test' };
		default:
			return state;
	}
}

export const authStore = createStore(authReducer);

export const selectAuth = (state) => state.user;
