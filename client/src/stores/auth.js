import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { authReducer } from '../reducers';

const middlewares = applyMiddleware(reduxThunk);

export const authStore = createStore(authReducer, middlewares);

export const selectAuth = (state) => state.user;
