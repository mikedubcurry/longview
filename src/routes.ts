import { NextFunction, Request, Response } from 'express';

import { deleteUser, logIn, signUp } from './services/auth';
import { createNewGoal, deleteGoalById, getAllGoals, getGoalById, updateGoalById } from './services/goal';
import {
	addGoalToProject,
	createUserProject,
	deleteUserProject,
	getSingleProject,
	getUserProjects,
	removeGoalFromProject,
	updateUserProject,
} from './services/project';

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
		handler: getUserProjects, // projects.getProjects
	},
	{
		path: '/projects',
		method: 'post',
		handler: createUserProject, // projects.createProject
	},
	{
		path: '/projects/:projectId',
		method: 'delete',
		handler: deleteUserProject, // projects.deleteProject
	},
	{
		path: '/projects/:projectId',
		method: 'get',
		handler: getSingleProject, // projects.getProject
	},
	{
		path: '/projects/:projectId',
		method: 'patch',
		handler: updateUserProject, // projects.updateProject
	},
	{
		path: '/projects/:projectId/goal',
		method: 'patch',
		handler: addGoalToProject, // projects.addGoal
	},
	{
		path: '/projects/:projectId/note',
		method: 'patch',
		handler: () => new Promise(() => {}), // proejcts.addNote
	},
	{
		path: '/projects/:projectId/goal',
		method: 'delete',
		handler: removeGoalFromProject, // projects.removeGoal
	},
	// goals
	{
		path: '/goals',
		method: 'get',
		handler: getAllGoals, // goals.getGoals
	},
	{
		path: '/goals/:goalId',
		method: 'get',
		handler: getGoalById, // goals.getGoal
	},
	{
		path: '/goals',
		method: 'post',
		handler: createNewGoal, // goals.createGoal
	},
	{
		path: '/goals/:goalId',
		method: 'patch',
		handler: updateGoalById, // goals.updateGoal
	},
	{
		path: '/goals/:goalId',
		method: 'delete',
		handler: deleteGoalById, // goals.deleteGoal
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
