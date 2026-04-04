import mongoose from 'mongoose';
import { Company, CompanyDocument } from './Company';
import { Application } from '../application/Application';
import {
	AddOutreachPersonRequest,
	optionalString,
	OutreachEvent,
	OutreachPerson,
	type CompanyDto,
	type CreateCompanyRequest,
} from 'jobhuntr-shared';
import { toOutreachPersonDto } from '../outreach/outreachMapper';
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

function normalizeCompanyName(name: string): string {
	return name.trim().toLowerCase();
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

export async function companyNameExists(name: string): Promise<boolean> {
	return !!(await Company.exists({ name }).collation({ locale: 'en', strength: 2 }));
}

export async function companyIdExists(id: string): Promise<boolean> {
	return !!(await Company.exists({ _id: new mongoose.Types.ObjectId(id) }));
}

export async function createCompany(input: CreateCompanyRequest): Promise<CompanyDto> {
	if (await companyNameExists(input.name)) {
		throw new Error('Company with this name already exists.');
	}

	const company = await Company.create({
		name: input.name,
		careersUrl: input.careersUrl,
		active: input.active ?? true,
	});

	return toCompanyDto(company);
}

export async function deleteCompany(id: string): Promise<void> {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error('Invalid company ID.');
	}

	// Check for applications referencing this company before deletion to maintain referential integrity
	const applicationsUsingCompany = await Application.exists({ companyId: id });
	if (applicationsUsingCompany) {
		throw new Error('Cannot delete company with existing applications.');
	}

	const company = await Company.findByIdAndDelete(id);
	if (!company) {
		throw new Error('Company not found.');
	}
}

export async function addCompanyOutreachPerson(
	companyId: string,
	dto: AddOutreachPersonRequest,
): Promise<OutreachPerson | null> {
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
	const company = await Company.findByIdAndUpdate(companyId, {
		$push: {
			outreach: person,
		},
	});
	if (!company) return null;
	return person;
}

export async function addCompanyOutreachPersonEvent(
	companyId: string,
	personId: string,
	dto: OutreachEvent,
): Promise<OutreachEvent | null> {
	const event: OutreachEvent = {
		id: randomUUID(),
		at: new Date(),
		isResponse: dto.isResponse,
		text: dto.text,
	};
	const result = await Company.updateOne(
		{ _id: companyId, 'outreach.id': personId },
		{
			$push: {
				'outreach.$.events': event,
			},
		},
	);
	if (result.matchedCount === 0) return null;
	return event;
}

export async function removeCompanyOutreachPerson(companyId: string, personId: string): Promise<undefined> {
	const result = await Company.updateOne(
		{ _id: companyId },
		{
			$pull: {
				outreach: { id: personId },
			},
		},
	);

	if (result.matchedCount === 0) {
		throw new Error('Company not found.');
	}

	if (result.modifiedCount === 0) {
		throw new Error('Outreach person not found.');
	}
}

export async function removeCompanyOutreachPersonEvent(
	companyId: string,
	personId: string,
	eventId: string,
): Promise<undefined> {
	const result = await Company.updateOne(
		{ _id: companyId, 'outreach.id': personId },
		{
			$pull: {
				'outreach.$.events': { id: eventId },
			},
		},
	);

	if (result.matchedCount === 0) {
		throw new Error('Company or outreach person not found.');
	}

	if (result.modifiedCount === 0) {
		throw new Error('Event not found.');
	}
}
