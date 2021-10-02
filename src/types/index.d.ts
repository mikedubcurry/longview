declare interface TUser {
	username: string;
	password: string;
	id: number;
	goals?: Goal[];
	projects?: Project[];
}

declare interface TGoal {
	goal: string;
	// createdOn: Date;
	// notes: Note[];
	id: number;
	ownerId: number;
}

declare interface TProject {
	idea: string;
	description: string;
	goalId?: number;
	// notes?: Note[];
	id: number;
	ownerId: number;
}

declare interface TNote {
	text: string;
	// createdOn: Date;
	id: number;
	ownerId: number;
}
