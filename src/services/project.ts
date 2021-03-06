import { Request, Response } from 'express';

import {
	getProjects,
	getProject,
	createProject,
	addGoal,
	deleteProject,
	removeGoal,
	updateProject,
} from '../controller/project';

export async function getUserProjects(req: Request, res: Response) {
	const user = req.user!;

	try {
		const projects = await getProjects(user.id);
		
		return res.json({ projects });
	} catch (e: any) {
		if (e.message.includes('must supply ownerId')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}

export async function getSingleProject(req: Request, res: Response) {
	const { projectId } = req.params;

	if (!parseInt(projectId)) {
		return res.status(400).json({ message: 'must supply projectId in route params' });
	}
	const user = req.user!;

	try {
		const project = await getProject(parseInt(projectId), user.id);

		return res.json({ project });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: 'project does not exist' });
		} else if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}

export async function createUserProject(req: Request, res: Response) {
	const { idea, description } = req.body;
	if (!idea || !description) {
		return res.status(400).json({ message: 'must include idea and description to create a project' });
	}
	const user = req.user!;
	const { goalId } = req.body;
	try {
		const project = await createProject(idea, description, user.id, parseInt(goalId));

		return res.json({ project });
	} catch (e: any) {
		if (e.message.includes('goal does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		} else if (e.message.includes('goal does not exist')) {
			return res.status(404).json({ message: 'goes does not exist' });
		} else if (e.message.includes('Must supply idea and description')) {
			return res.status(400).json({ message: 'Must supply idea and description' });
		}
	}
}

export async function updateUserProject(req: Request, res: Response) {
	const { idea, description } = req.body as { idea: string; description: string };

	if (!idea && !description) {
		return res.status(400).json({ message: 'must supply idea or description to update a project' });
	}

	const { projectId } = req.params;
	if (!parseInt(projectId)) {
		return res.status(400).json('must supply a valid projectId in url params');
	}

	const user = req.user!;

	try {
		const project = await getProject(parseInt(projectId), user.id);

		const updatedProject = await updateProject(parseInt(projectId), user.id, { idea, description });

		return res.json({ project: updatedProject });
	} catch (e: any) {
		if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
	}
}

export async function deleteUserProject(req: Request, res: Response) {
	const { projectId } = req.params;
	if (!parseInt(projectId)) {
		return res.status(400).json({ message: 'must supply projectId to delete project' });
	}
	const user = req.user!;
	try {
		const project = await getProject(parseInt(projectId), user.id);

		const deleted = await deleteProject(project.id, user.id);

		return res.json({ deleted });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}

export async function addGoalToProject(req: Request, res: Response) {
	const { projectId } = req.params;

	if (!parseInt(projectId)) {
		return res.status(400).json({ message: 'must pass projectId to add a goal to a project' });
	}
	const { goalId } = req.body;
	if (!parseInt(goalId)) {
		return res.status(400).json({ message: 'must supply goalId to add goal to project' });
	}

	const user = req.user!;

	try {
		const withGoal = await addGoal(parseInt(projectId), parseInt(goalId), user.id);

		return res.json({ project: withGoal });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}

export async function removeGoalFromProject(req: Request, res: Response) {
	const { projectId } = req.params;
	if (!parseInt(projectId)) {
		return res.status(400).json({ message: 'must supply projectId to remove a goal' });
	}

	const user = req.user!;

	try {
		const withoutGoal = await removeGoal(parseInt(projectId), user.id);

		return res.json({ project: withoutGoal });
	} catch (e: any) {
		if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
	}
}

// export async function addNoteToProject(req: Request, res: Response) {}
