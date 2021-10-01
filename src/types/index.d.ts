declare type TUser = {
	username: string;
	password: string;
	id: number;
	// goals: Goal[];
	// projects: Project[];
};

declare type Goal = {
	goal: string;
	createdOn: Date;
	notes: Note[];
	id: number;
};

declare type Project = {
	idea: string;
	description: string;
	goal?: Goal;
	createdOn: Date;
	notes: Note[];
	id: number;
};

declare type Note = {
	text: string;
	createdOn: Date;
	id: number;
};
