export interface OutreachEvent {
	id: string;
	text?: string;
	isResponse: boolean;
	at: Date;
}

export interface OutreachPerson {
	id: string;
	name: string;
	url?: string;
	role?: string;
	email?: string;
	events: OutreachEvent[];
}

export interface AddOutreachPersonRequest {
	name: string;
	url?: string;
	role?: string;
	email?: string;
	firstEvent?: OutreachEvent;
}

export interface AddOutreachEventRequest {
	text?: string;
	isResponse: boolean;
}
