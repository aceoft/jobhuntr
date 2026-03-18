import mongoose from 'mongoose';
import Company from '../models/Company';
import type { CompanyDto, CreateCompanyRequest } from 'jobhuntr-shared';

function toCompanyDto(doc: any): CompanyDto {
	return {
		_id: doc._id.toString(),
		name: doc.name,
		careersUrl: doc.careersUrl,
		active: doc.active,
	};
}

export async function getAllCompanies(): Promise<CompanyDto[]> {
	const companies = await Company.find({ active: true }).sort({ name: 1 });

	return companies.map(toCompanyDto);
}

export async function getCompanyById(
	id: string,
	options: { includeInactive?: boolean } = {},
): Promise<CompanyDto | null> {
	if (!mongoose.Types.ObjectId.isValid(id)) return null;

	const company = await Company.findById(id);
	if (!company || (!options.includeInactive && !company.active)) return null;

	return toCompanyDto(company);
}

export async function createCompany(input: CreateCompanyRequest): Promise<CompanyDto> {
	const company = await Company.create({
		name: input.name,
		careersUrl: input.careersUrl,
		active: input.active ?? true,
	});

	return toCompanyDto(company);
}
