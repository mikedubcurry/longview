import { Goal, User } from '../model';
import { AuthError, BadInputError, NonExistentError } from './utlis';

export async function createGoal(goal: string, ownerId: number) {
	if (!goal) {
		throw new BadInputError('must include goal text to create a new Goal');
	}
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to create a new Goal');
	}
	const user = await User.findByPk(ownerId);
	if (!user) {
		throw new AuthError(`user with id: ${ownerId} does not exist`);
	}
	const newGoal = await user.createGoal({ goal });
	return await newGoal.save();
}

export async function getGoals(ownerId: number) {
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to get all Goals');
	}
	const user = await User.findByPk(ownerId);
	if (user) {
		const goals = await user.getGoals();
		return goals;
	} else {
		throw new AuthError(`user with id: ${ownerId} does not exist`);
	}
}

export async function getGoal(goalId: number, ownerId: number) {
	if (!goalId) {
		throw new BadInputError('must supply goalId to get a goal');
	}
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to get a goal');
	}
	const user = await User.findByPk(ownerId);
	if (!user) {
		throw new AuthError(`user with id: ${ownerId} does not exist`);
	}
	// get goal from user's association
	const [goal] = await user.getGoals({ where: { id: goalId } });

	if (!goal) {
		throw new NonExistentError('goal doesnt exist');
	}

	if (goal.ownerId !== ownerId) {
		throw new AuthError('goal does not belong to user');
	}

	return goal;
}

export async function updateGoal(goalId: number, goal: string, ownerId: number) {
	if (!goal) {
		throw new BadInputError('must supply goal text to update a Goal');
	}
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to update a goal');
	}
	if (!goalId) {
		throw new BadInputError('must supply goalId to update a Goal');
	}
	const goalExists = await Goal.findOne({ where: { id: goalId } });
	// check if there is a goal to update
	if (goalExists) {
		// check if goal belongs to user
		if (ownerId !== goalExists.ownerId) {
			throw new AuthError('cannot update a goal that does not belong to you');
		} else {
			// goal exists and belongs to user, go ahead and update
			const updatedGoal = await Goal.update({ goal }, { where: { id: goalId } });
			return updatedGoal;
		}
	} else {
		throw new NonExistentError(`goal with id ${goalId} does not exist`);
	}
}

export async function deleteGoal(goalId: number, ownerId: number) {
	if (!goalId) {
		throw new BadInputError('must supply goalId to delete a goal');
	}
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to delete a goal');
	}
	const goalExists = await Goal.findOne({ where: { id: goalId } });
	// check if goal exists
	if (goalExists) {
		// check if goal belongs to user
		if (goalExists.ownerId !== ownerId) {
			throw new AuthError('cannot delete a goal that does not belong to you');
		}
		// goal exists and belongs to user, go ahead and delete
		const deleted = await Goal.destroy({ where: { id: goalId } });
		return deleted;
	} else {
		throw new NonExistentError(`goal with id: ${goalId} does not exists`);
	}
}
