import { Goal, User } from '../model';

export async function createGoal(goal: string, ownerId: number) {
	if (!goal) {
		throw Error('must include goal text to create a new Goal');
	}
	if (!ownerId) {
		throw Error('must supply ownerId to create a new Goal');
	}
	const user = await User.findByPk(ownerId);
	if (!user) {
		throw Error(`user with id: ${ownerId} does not exist`);
	}
	const newGoal = await user.createGoal({ goal, ownerId });
	return await newGoal.save();
	// const newGoal = await Goal.create({ goal, ownerId });
	// return await newGoal.save();
}

export async function getGoals(ownerId: number) {
	if (!ownerId) {
		throw Error('must supply ownerId to get all Goals');
	}
	const goals = await Goal.findAll({ where: { ownerId } });
	return goals;
}

export async function getGoal(goalId: number, ownerId: number) {
	if (!goalId) {
		throw Error('must supply goalId to get a goal');
	}
	if (!ownerId) {
		throw Error('must supply ownerId to get a goal');
	}
	const goal = await Goal.findOne({
		where: {
			id: goalId,
		},
	});

	if (goal && goal.ownerId !== ownerId) {
		throw Error('goal does not belong to user');
	}

	return goal;
}

export async function updateGoal(goalId: number, goal: string, ownerId: number) {
	if (!goal) {
		throw Error('must supply goal text to update a Goal');
	}
	if (!ownerId) {
		throw Error('must supply ownerId to update a goal');
	}
	if (!goalId) {
		throw Error('must supply goalId to update a Goal');
	}
	const goalExists = await Goal.findOne({ where: { id: goalId } });
	// check if there is a goal to update
	if (goalExists) {
		// check if goal belongs to user
		if (ownerId !== goalExists.ownerId) {
			throw Error('cannot update a goal that does not belong to you');
		} else {
			// goal exists and belongs to user, go ahead and update
			const updatedGoal = await Goal.update({ goal }, { where: { id: goalId } });
			return updateGoal;
		}
	} else {
		throw Error(`goal with id ${goalId} does not exist`);
	}
}

export async function deleteGoal(goalId: number, ownerId: number) {
	if (!goalId) {
		throw Error('must supply goalId to delete a goal');
	}
	if (!ownerId) {
		throw Error('must supply ownerId to delete a goal');
	}
	const goalExists = await Goal.findOne({ where: { id: goalId } });
	// check if goal exists
	if (goalExists) {
		// check if goal belongs to user
		if (goalExists.ownerId !== ownerId) {
			throw Error('cannot delete a goal that does not belong to you');
		}
		// goal exists and belongs to user, go ahead and delete
		const deleted = await Goal.destroy({ where: { id: goalId } });
		return deleted;
	} else {
		throw Error(`goal with id: ${goalId} does not exists`);
	}
}
