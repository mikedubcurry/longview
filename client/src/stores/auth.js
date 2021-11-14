import { createStore, applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';

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

const middlewares = applyMiddleware(reduxThunk);

export const authStore = createStore(authReducer, middlewares);

export const selectAuth = (state) => state.user;
