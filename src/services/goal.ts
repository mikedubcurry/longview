import { Request, Response } from 'express';

import { createGoal } from '../controller/goal';
import { getToken, getUser } from '../middleware';

export async function getAllGoals(req: Request, res: Response) {}

export async function getGoalById(req: Request, res: Response) {
	const { goalId } = req.params;
	if (!parseInt(goalId)) {
		return res.status(400).json({ message: 'must supply goalId in route params' });
	}
	const user = req.user!;
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

export async function updateGoalById(req: Request, res: Response) {}

export async function deleteGoalById(req: Request, res: Response) {}
