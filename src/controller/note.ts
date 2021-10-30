import { User } from '../model';
import { getProject } from './project';
import { AuthError, BadInputError, NonExistentError } from './utlis';

export async function createNote(text: string, projectId: number, ownerId: number) {
	if (!text) {
		throw new BadInputError('must supply text to createNote');
	}
	if (!projectId) {
		throw new BadInputError('must supply projectId to createNotes');
	}
	if (!ownerId) {
		throw new BadInputError('must supply ownerId to createNote');
	}
	try {
		const project = await getProject(projectId, ownerId);

		const withNote = await project.createNote({ text, ownerId, projectId });

		return await withNote.save();
	} catch (e: any) {
		if (e.message.includes('does not belong to user')) {
			throw new AuthError(e.message);
		}
		if (e.message.includes('does not exist')) {
			throw new NonExistentError(e.message);
		}
	}
}

export async function getProjectNotes(projectId: number, ownerId: number) {
	if (!projectId) {
		throw new BadInputError('must supply projectId to getProjectNotes');
	}
	try {
		const project = await getProject(projectId, ownerId);

		const projectNotes = await project.getNotes();

		return projectNotes;
	} catch (e: any) {
		if (e.message.includes('does not belong to user')) {
			throw new AuthError(e.message);
		}
		if (e.message.includes('does not exist')) {
			throw new NonExistentError(e.message);
		}
	}
}

export async function getUserNotes(ownerId: number) {
	const user = await User.findByPk(ownerId);

	if (!user) {
		throw new AuthError('unauthorized');
	}
	const userNotes = await user.getNotes();

	return userNotes;
}

export async function updateNote(noteId: number, text: string, ownerId: number) {
	
}

export async function deleteNote(noteId: number, ownerId: number) {}
