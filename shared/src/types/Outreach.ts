export type OutreachEvent = {
	text?: string;
	isResponse: boolean;
	at: Date;
};

export type OutreachPerson = {
	name: string;
	url?: string;
	role?: string;
	email?: string;
	events: OutreachEvent[];
};
