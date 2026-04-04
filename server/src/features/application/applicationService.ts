import { ApplicationDto, CreateApplicationRequest, optionalString } from 'jobhuntr-shared';
import mongoose from 'mongoose';
import { Application, ApplicationDocument } from './Application';
import { toOutreachPersonDto } from '../outreach/outreachMapper';
import { getCompanyById } from '../company/companyService';

function toApplicationDto(doc: ApplicationDocument): ApplicationDto {
	return {
		_id: doc._id.toString(),
		companyId: doc.companyId.toString(),
		roleTitle: doc.roleTitle,
		companyNameSnapshot: doc.companyNameSnapshot,
		postingUrl: optionalString(doc.postingUrl),
		postingSource: optionalString(doc.postingSource),
		level: doc.level,
		salaryRangeLow: doc.salaryRangeLow || undefined,
		salaryRangeHigh: doc.salaryRangeHigh || undefined,
		resumeUsed: optionalString(doc.resumeUsed),
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
		notes: doc.notes,
		outreach: doc.outreach.map((o) => toOutreachPersonDto(o)),
		open: doc.open,
		postedAt: doc.postedAt || undefined,
		appliedAt: doc.appliedAt || undefined,
		status: doc.status,
	};
}

export async function getApplicationById(id: string): Promise<ApplicationDto | null> {
	if (!mongoose.Types.ObjectId.isValid(id)) return null;

	const application = await Application.findById(id);
	if (!application) return null;

	return toApplicationDto(application);
}

export async function createApplication(companyId: string, input: CreateApplicationRequest): Promise<ApplicationDto> {
	const company = await getCompanyById(companyId);
	if (!company) {
		throw new Error('Company not found.');
	}

	return Application.create({
		companyId: company._id,
		roleTitle: input.roleTitle,
		companyNameSnapshot: company.name,
		postingUrl: input.postingUrl,
		postingSource: input.postingSource,
		level: input.level,
		salaryRangeLow: input.salaryRangeLow,
		salaryRangeHigh: input.salaryRangeHigh,
		resumeUsed: input.resumeUsed,
		status: input.status,
		postedAt: input.postedAt,
		appliedAt: new Date(),
	}).then(toApplicationDto);
}

export async function deleteApplication(companyId: string, id: string): Promise<void> {
	if (!mongoose.Types.ObjectId.isValid(companyId)) {
		throw new Error('Invalid company ID.');
	}
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error('Invalid application ID.');
	}

	const company = await getCompanyById(companyId);
	if (!company) {
		throw new Error('Company not found.');
	}

	const application = await Application.findByIdAndDelete(id);
	if (!application) {
		throw new Error('Application not found.');
	}
}
