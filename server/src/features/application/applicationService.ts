import { ApplicationDto, optionalString } from 'jobhuntr-shared';
import mongoose from 'mongoose';
import { Application, ApplicationDocument } from './Application';
import { toOutreachPersonDto } from '../outreach/outreachMapper';

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
