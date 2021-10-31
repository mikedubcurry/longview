import { Request, Response } from 'express';

import { createNote, deleteNote, getProjectNotes, getUserNotes, updateNote } from '../controller/note';

export async function getNotes(req: Request, res: Response) {}
export async function getProjectsNotes(req: Request, res: Response) {}
export async function createNewNote(req: Request, res: Response) {}
export async function updateANote(req: Request, res: Response) {}
export async function deleteANote(req: Request, res: Response) {}
