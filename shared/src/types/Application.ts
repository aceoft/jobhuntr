import { Note } from './Note';
import { OutreachPerson } from './Outreach';

export const ApplicationStatusValues = [
	'saved',
	'applied',
	'responded',
	'interview',
	'offer',
	'rejected',
	'withdrawn',
] as const;

export type ApplicationStatus = (typeof ApplicationStatusValues)[number];

export const ApplicationLevelValues = ['mid', 'senior', 'staff', 'management'] as const;

export type ApplicationLevel = (typeof ApplicationLevelValues)[number];

export const FirstResponseTypeValues = ['rejection', 'positive', 'other'] as const;

export type FirstResponseType = (typeof FirstResponseTypeValues)[number];

export type ApplicationStatusChange = {
	status: ApplicationStatus;
	at: Date;
	note?: string;
};

export type ApplicationDto = {
	_id: string;
	companyId: string;
	companyNameSnapshot: string;
	roleTitle: string;
	postingUrl?: string;
	postingSource?: string;
	level: ApplicationLevel;
	salaryRangeLow?: number;
	salaryRangeHigh?: number;
	resumeUsed?: string;

	status: ApplicationStatus;
	open: boolean;

	postedAt?: Date;
	appliedAt?: Date;
	postingAgeDaysAtApply?: number;

	firstResponseAt?: Date;
	firstResponseType?: FirstResponseType;

	rejectedAt?: Date;
	closedAt?: Date;

	statusHistory: ApplicationStatusChange[];
	outreach: OutreachPerson[];
	notes: Note[];

	createdAt: Date;
	updatedAt: Date;
};

export type CreateApplicationRequest = {
	companyId: string;
	roleTitle: string;
	postingUrl?: string;
	postingSource?: string;
	level: ApplicationLevel;
	salaryRangeLow?: number;
	salaryRangeHigh?: number;
	resumeUsed?: string;

	status: ApplicationStatus;

	postedAt?: Date;
	postingAgeDaysAtApply?: number;
};
