import { NextFunction, Request, Response } from 'express';

import { deleteUser, logIn, signUp } from './services/auth';

type Route = {
	path: `/${string}`;
	method: 'post' | 'get' | 'patch' | 'put' | 'delete';
	handler: (req: Request, res: Response, next?: NextFunction) => Promise<any>;
};

export const authRoutes: Route[] = [
	// users
	{
		path: '/user/signup',
		method: 'post',
		handler: signUp, // users.signup
	},
	{
		path: '/user/login',
		method: 'post',
		handler: logIn, // users.login
	},
];
export const protectedRoutes: Route[] = [
	{
		path: '/user',
		method: 'delete',
		handler: deleteUser, // users.deleteUser
	},
	// projects
	{
		path: '/projects',
		method: 'get',
		handler: () => new Promise(() => {}), // projects.getProjects
	},
	{
		path: '/projects',
		method: 'post',
		handler: () => new Promise(() => {}), // projects.createProject
	},
	{
		path: '/projects/:projectId',
		method: 'delete',
		handler: () => new Promise(() => {}), // projects.deleteProject
	},
	{
		path: '/projects/:projectId',
		method: 'get',
		handler: () => new Promise(() => {}), // projects.getProject
	},
	{
		path: '/projects/:projectId/goal',
		method: 'patch',
		handler: () => new Promise(() => {}), // projects.addGoal
	},
	{
		path: '/projects/:projectId/note',
		method: 'patch',
		handler: () => new Promise(() => {}), // proejcts.addNote
	},
	{
		path: '/projects/:projectId/goal',
		method: 'delete',
		handler: () => new Promise(() => {}), // projects.removeGoal
	},
	// goals
	{
		path: '/goals',
		method: 'get',
		handler: () => new Promise(() => {}), // goals.getGoals
	},
	{
		path: '/goals/:goalId',
		method: 'get',
		handler: () => new Promise(() => {}), // goals.getGoal
	},
	{
		path: '/goals',
		method: 'post',
		handler: () => new Promise(() => {}), // goals.createGoal
	},
	{
		path: '/goals/:goalId',
		method: 'patch',
		handler: () => new Promise(() => {}), // goals.updateGoal
	},
	{
		path: '/goals/:goalId',
		method: 'delete',
		handler: () => new Promise(() => {}), // goals.deleteGoal
	},
	// notes
	{
		path: '/notes',
		method: 'get',
		handler: () => new Promise(() => {}), // notes.getNotes
	},
	{
		path: '/notes/:projectId',
		method: 'get',
		handler: () => new Promise(() => {}), // notes.getProjectNotes
	},
	{
		path: '/notes',
		method: 'post',
		handler: () => new Promise(() => {}), // notes.createNote
	},
	{
		path: '/notes/:noteId',
		method: 'patch',
		handler: () => new Promise(() => {}), // notes.updateNote
	},
	{
		path: '/notes/:noteId',
		method: 'delete',
		handler: () => new Promise(() => {}), // notes.deleteNote
	},
];
