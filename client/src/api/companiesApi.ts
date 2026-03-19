import axios from 'axios';
import type { CompanyDto, CreateCompanyRequest } from 'jobhuntr-shared';

export function getCompanies(): Promise<CompanyDto[]> {
	return axios.get<CompanyDto[]>('/api/companies').then((res) => res.data);
}

export function getCompanyById(id: string): Promise<CompanyDto> {
	return axios.get<CompanyDto>(`/api/companies/${id}`).then((res) => res.data);
}

export function createCompany(input: CreateCompanyRequest): Promise<CompanyDto> {
	return axios.post<CompanyDto>('/api/companies', input).then((res) => res.data);
}
