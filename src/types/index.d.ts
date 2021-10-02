declare type TUser = {
	username: string;
	password: string;
	id: number;
	// goals: Goal[];
	// projects: Project[];
};

declare type TGoal = {
	goal: string;
	// createdOn: Date;
	// notes: Note[];
	id: number;
};

declare type TProject = {
	idea: string;
	description: string;
	// goal?: Goal;
	// notes?: Note[];
	id: number;
};

declare type TNote = {
	text: string;
	// createdOn: Date;
	id: number;
};
