import { Request, Response } from 'express';

import { createGoal, deleteGoal, getGoal, getGoals, updateGoal } from '../controller/goal';
import { getToken, getUser } from '../middleware';

export async function getAllGoals(req: Request, res: Response) {
	const user = req.user!;
	try {
		const goals = await getGoals(user.id);

		return res.json({ goals });
	} catch (e: any) {
		if (e.message === 'must supply ownerId to get all Goals') {
			return res.status(401).json({ message: 'unauthorized' });
		}
	}
}

export async function getGoalById(req: Request, res: Response) {
	const { goalId } = req.params;
	if (!parseInt(goalId)) {
		return res.status(400).json({ message: 'must supply goalId in route params' });
	}
	const user = req.user!;
	try {
		const goal = await getGoal(parseInt(goalId), user.id);

		return res.json({ goal });
	} catch (e: any) {
		if (e.message === 'goal doesnt exist') {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('user with id:')) {
			return res.status(401).json({ message: e.message });
		}
	}
}

export async function createNewGoal(req: Request, res: Response) {
	const { goal } = req.body;
	if (!goal) {
		return res.status(400).json({ message: 'must supply goal text to create a new goal' });
	}
	const user = req.user!;
	const newGoal = await createGoal(goal, user.id);
	return res.json({ goal: newGoal });
}

export async function updateGoalById(req: Request, res: Response) {
	const { goal } = req.body;
	if (!goal || typeof goal !== 'string') {
		return res.status(400).json({ message: 'must include goal text to update a goal' });
	}
	const { goalId } = req.params;
	if (!parseInt(goalId)) {
		return res.status(400).json({ message: 'must include goalId in route params update a goal' });
	}

	const user = req.user!;

	try {
		const updated = await updateGoal(parseInt(goalId), goal, user.id);
		res.json({ goal: updated });
	} catch (e: any) {
		if (e.message.includes('does not belong to you')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
	}
}

export async function deleteGoalById(req: Request, res: Response) {
	const { goalId } = req.params;

	if (!parseInt(goalId)) {
		return res.status(400).json({ message: 'must pass valid goalId to delete a goal' });
	}

	const user = req.user!;

	try {
		const deleted = await deleteGoal(parseInt(goalId), user.id);
		return res.json({message: deleted})
	} catch (e: any) {
		if (e.message.includes('does not belong to you')) {
			return res.status(401).json({ message: e.message });
		}
		if(e.message.includes('does not exists')) {
			return res.status(404).json({message: e.message})
		}
	}
}
