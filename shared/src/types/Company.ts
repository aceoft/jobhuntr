import { OutreachPerson } from './Outreach';

export interface CompanyDto {
	_id: string;
	name: string;
	careersUrl?: string;
	outreach: OutreachPerson[];
	active: boolean;
}

export interface CreateCompanyRequest {
	name: string;
	careersUrl?: string;
	active?: boolean;
}
