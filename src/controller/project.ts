import { Goal, User, Project } from '../model';
import { AuthError, BadInputError } from './utlis';

export async function createProject(idea: string, description: string, ownerId: number, goalId?: number) {
	if (!idea || !description) {
		throw new BadInputError('Must supply idea and description to create a project');
	}
	if (!ownerId) {
		throw new AuthError('must supply ownerId to create a project');
	}
	const user = await User.findByPk(ownerId);
	if (!user) {
		throw new AuthError('user with supplied ownerId does not exist');
	}
	if (goalId) {
		// create project wiith goal
		const goal = await Goal.findByPk(goalId);
		if (!goal) {
			throw new BadInputError('goal does not exist');
		}
		if (goal.ownerId !== ownerId) {
			throw new AuthError('supplied goal does not belong to user');
		}

		const newProject = await Project.create({
			idea,
			description,
			ownerId,
			goalId,
		});

		return await newProject.save();
	} else {
		// create project without goal

		const newProject = await Project.create({
			idea,
			description,
			ownerId,
		});

		return await newProject.save();
	}
}

export async function getProject(projectId: number) {}

export async function getProjects() {}

export async function addGoal(projectId: number, goalId: number) {}

export async function addNote(projectId: number, noteId: number) {}

export async function deleteProject(projectId: number) {}

export async function removeGoal(projectId: number) {}
