import axios from 'axios';
import { ApplicationDto, CreateApplicationRequest } from 'jobhuntr-shared';

export function getApplications(companyId: string): Promise<ApplicationDto[]> {
	return axios.get<ApplicationDto[]>(`/api/companies/${companyId}/applications`).then((res) => res.data);
}

export function getApplicationById(companyId: string, applicationId: string): Promise<ApplicationDto> {
	return axios.get<ApplicationDto>(`/api/companies/${companyId}/applications/${applicationId}`).then((res) => res.data);
}

export function createApplication(companyId: string, input: CreateApplicationRequest): Promise<ApplicationDto> {
	return axios.post<ApplicationDto>(`/api/companies/${companyId}/applications`, input).then((res) => res.data);
}

export function deleteApplication(companyId: string, applicationId: string): Promise<void> {
	return axios.delete(`/api/companies/${companyId}/applications/${applicationId}`);
}
