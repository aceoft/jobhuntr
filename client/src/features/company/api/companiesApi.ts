import axios from 'axios';
import type {
	AddOutreachPersonRequest,
	CompanyDto,
	CreateCompanyRequest,
	OutreachEvent,
	OutreachPerson,
} from 'jobhuntr-shared';

export function getCompanies(): Promise<CompanyDto[]> {
	return axios.get<CompanyDto[]>('/api/companies').then((res) => res.data);
}

export function getCompanyById(id: string): Promise<CompanyDto> {
	return axios.get<CompanyDto>(`/api/companies/${id}`).then((res) => res.data);
}

export function createCompany(input: CreateCompanyRequest): Promise<CompanyDto> {
	return axios.post<CompanyDto>('/api/companies', input).then((res) => res.data);
}

export function deleteCompany(id: string): Promise<CompanyDto> {
	return axios.delete(`/api/companies/${id}`);
}

export function addCompanyOutreachPerson(companyId: string, dto: AddOutreachPersonRequest) {
	return axios.post<OutreachPerson>(`/api/companies/${companyId}/outreach`, dto).then((res) => res.data);
}

export function removeCompanyOutreachPerson(companyId: string, personId: string) {
	return axios.delete(`/api/companies/${companyId}/outreach/${personId}`);
}

export function addCompanyOutreachPersonEvent(companyId: string, personId: string, event: OutreachEvent) {
	return axios
		.post<OutreachEvent>(`/api/companies/${companyId}/outreach/${personId}/events`, event)
		.then((res) => res.data);
}

export function removeCompanyOutreachPersonEvent(companyId: string, personId: string, eventId: string) {
	return axios.delete(`/api/companies/${companyId}/outreach/${personId}/events/${eventId}`);
}
