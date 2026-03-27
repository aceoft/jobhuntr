import mongoose from 'mongoose';
import { Company, CompanyDocument } from '../models/Company';
import {
	AddOutreachPersonRequest,
	optionalString,
	OutreachEvent,
	OutreachPerson,
	type CompanyDto,
	type CreateCompanyRequest,
} from 'jobhuntr-shared';
import { toOutreachPersonDto } from './outreachMapper';
import { randomUUID } from 'crypto';

function toCompanyDto(doc: CompanyDocument): CompanyDto {
	return {
		_id: doc._id.toString(),
		name: doc.name,
		careersUrl: optionalString(doc.careersUrl),
		active: doc.active,
		outreach: doc.outreach.map((o) => toOutreachPersonDto(o)),
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

export async function addCompanyOutreachPerson(
	companyId: string,
	dto: AddOutreachPersonRequest,
): Promise<OutreachPerson> {
	const person: OutreachPerson = {
		id: randomUUID(),
		name: dto.name,
		email: dto.email,
		role: dto.role,
		url: dto.url,
		events: dto.firstEvent
			? [
					{
						id: randomUUID(),
						at: new Date(),
						isResponse: dto.firstEvent.isResponse,
						text: dto.firstEvent.text,
					},
				]
			: [],
	};
	await Company.findByIdAndUpdate(companyId, {
		$push: {
			outreach: person,
		},
	});
	return person;
}

export async function addCompanyOutreachPersonEvent(
	companyId: string,
	personId: string,
	dto: OutreachEvent,
): Promise<OutreachEvent> {
	const event: OutreachEvent = {
		id: randomUUID(),
		at: new Date(),
		isResponse: dto.isResponse,
		text: dto.text,
	};
	const result = await Company.findOneAndUpdate(
		{ _id: companyId, 'outreach.id': personId },
		{
			$push: {
				'outreach.$.events': event,
			},
		},
	);
	return event;
}
