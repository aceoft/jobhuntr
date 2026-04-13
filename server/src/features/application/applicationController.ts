import { Request, Response, NextFunction } from 'express';
import { CreateApplicationRequest } from 'jobhuntr-shared';
import * as applicationService from './applicationService';

export async function getApplicationsForCompanyById(
	req: Request<{ companyId: string }>,
	res: Response,
	next: NextFunction,
) {
	try {
		const applications = await applicationService.getApplicationsForCompanyById(req.params.companyId);
		res.status(200).json(applications);
	} catch (err) {
		next(err);
	}
}

export async function getApplicationById(req: Request<{ applicationId: string }>, res: Response, next: NextFunction) {
	try {
		const application = await applicationService.getApplicationById(req.params.applicationId);
		if (!application) {
			res.status(404).json({ error: 'Application not found.' });
			return;
		}
		res.status(200).json(application);
	} catch (err) {
		next(err);
	}
}

export async function createApplication(
	req: Request<{ companyId: string }, {}, CreateApplicationRequest>,
	res: Response,
	next: NextFunction,
) {
	try {
		const application = await applicationService.createApplication(req.params.companyId, req.body);
		res.status(201).json(application);
	} catch (err) {
		next(err);
	}
}

export async function deleteApplication(
	req: Request<{ companyId: string; applicationId: string }>,
	res: Response,
	next: NextFunction,
) {
	try {
		await applicationService.deleteApplication(req.params.companyId, req.params.applicationId);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
