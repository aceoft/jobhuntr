import { Request, Response, NextFunction } from 'express';
import { CreateApplicationRequest } from 'jobhuntr-shared';
import * as applicationService from './applicationService';

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
	req: Request<{ companyId: string; id: string }>,
	res: Response,
	next: NextFunction,
) {
	try {
		await applicationService.deleteApplication(req.params.companyId, req.params.id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
