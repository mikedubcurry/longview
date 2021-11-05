import { Request, Response } from 'express';

import { createNote, deleteNote, getProjectNotes, getUserNotes, updateNote } from '../controller/note';

export async function getNotes(req: Request, res: Response) {
	const user = req.user!;

	try {
		const notes = await getUserNotes(user.id);

		return res.json({ notes });
	} catch (e: any) {
		if (e.message.includes('unauthorized')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		// throw 500 if error is unknown
		return res.status(500).json({ message: 'server error fetching user notes' });
	}
}

export async function getProjectsNotes(req: Request, res: Response) {
	const { projectId } = req.params;

	if (!parseInt(projectId)) {
		return res.status(400).json({ message: "must supply a valid projectId to get a project's notes" });
	}

	const user = req.user!;

	try {
		const notes = await getProjectNotes(parseInt(projectId), user.id);

		return res.json({ notes });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: e.message });
		}
		// throw 500 if error is unknown
		return res.status(500).json({ message: 'server error fetching project notes' });
	}
}

export async function createNewNote(req: Request, res: Response) {
	const { projectId } = req.params;

	if (!parseInt(projectId)) {
		return res.status(400).json({ message: 'must supply a valid projectId to create a new note' });
	}
	const { text } = req.body;
	if (!text) {
		return res.status(400).json({ message: 'must supply note text to create a new note' });
	}

	const user = req.user!;

	try {
		const note = await createNote(text.trim(), parseInt(projectId), user.id);

		return res.json({ note });
	} catch (e: any) {
		if (e.message.includes('does not belong to user')) {
			return res.status(401).json({ message: e.message });
		}
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		return res.status(500).json({ message: 'server error creating a new note' });
	}
}
export async function updateANote(req: Request, res: Response) {
	const { noteId } = req.params;

	if (!parseInt(noteId)) {
		return res.status(400).json({ message: 'must supply valid projectId to update a note' });
	}

	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ message: 'must supply text to update a note' });
	}

	const user = req.user!;

	try {
		const [note] = await updateNote(parseInt(noteId), text.trim(), user.id);

		return res.json({ note });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		return res.status(500).json({ message: 'server error updating a note' });
	}
}
export async function deleteANote(req: Request, res: Response) {
	const { noteId } = req.params;
	if (!parseInt(noteId)) {
		return res.status(400).json({ message: 'must supply valid noteId to delete a note' });
	}

	const user = req.user!;

	try {
		const deleted = await deleteNote(parseInt(noteId), user.id);

		return res.json({ deleted });
	} catch (e: any) {
		if (e.message.includes('does not exist')) {
			return res.status(404).json({ message: e.message });
		}
		if (e.message.includes('note does not belong to user')) {
			return res.status(401).json({ message: 'unauthorized' });
		}
		return res.status(500).json({ message: 'server error deleting note' });
	}
}
