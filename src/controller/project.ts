import { Goal, User, Project } from '../model';
import { AuthError, BadInputError, NonExistentError } from './utlis';

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

		const newProject = await user.createProject({
			idea,
			description,
			ownerId,
			goalId,
		});

		return await newProject.save();
	} else {
		// create project without goal

		const newProject = await user.createProject({
			idea,
			description,
			ownerId,
		});

		return await newProject.save();
	}
}

export async function getProject(projectId: number, ownerId: number) {
	if (!projectId || !ownerId) {
		throw new BadInputError('must supply projectId and ownerId to getProject');
	}
	const project = await Project.findByPk(projectId);
	if (!project) {
		throw new NonExistentError(`project with id: ${projectId} does not exist`);
	}
	if (project.ownerId !== ownerId) {
		throw new AuthError('project does not belong to user');
	}
	return project;
}

export async function getProjects(ownerId: number) {
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to getProjects');
	}

	const user = await User.findByPk(ownerId);

	if (user) {
		const projects = await user.getProjects();

		return projects;
	} else {
		throw new AuthError(`user with id: ${ownerId} does not exist`);
	}
}

export async function updateProject(
	projectId: number,
	ownerId: number,
	newProject: { idea?: string; description?: string }
) {
	if (!projectId || !ownerId || (!newProject.idea && !newProject.description)) {
		throw new BadInputError('must supply projectId, ownerId and a new idea or desctiption to updateProject');
	}
	const project = await Project.findByPk(projectId);
	if (!project) {
		throw new NonExistentError(`project with id: ${projectId} does not exist`);
	}

	const user = await User.findByPk(ownerId);

	if (project.ownerId !== ownerId) {
		throw new AuthError('project does not belong to user');
	}

	const [updatedProject] = await Project.upsert(
		{
      id: project.id,
      ownerId: project.ownerId,
			// if idea or description are in newProject obj, use them in update, else use old value
			idea: newProject.idea ? newProject.idea : project.idea,
			description: newProject.description ? newProject.description : project.description,
		},
	);
  

	return updatedProject;
}

export async function addGoal(projectId: number, goalId: number, ownerId: number) {}

export async function addNote(projectId: number, noteId: number, ownerId: number) {}

export async function deleteProject(projectId: number, ownerId: number) {}

export async function removeGoal(projectId: number, ownerId: number) {}
