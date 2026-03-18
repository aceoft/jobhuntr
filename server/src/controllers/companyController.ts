import type { Request, Response, NextFunction } from 'express';
import type { CreateCompanyRequest } from 'jobhuntr-shared';
import * as companyService from '../services/companyService';

export async function getCompanies(req: Request, res: Response, next: NextFunction) {
	try {
		const companies = await companyService.getAllCompanies();
		res.json(companies);
	} catch (err) {
		next(err);
	}
}

export async function createCompany(req: Request<{}, {}, CreateCompanyRequest>, res: Response, next: NextFunction) {
	try {
		const company = await companyService.createCompany(req.body);
		res.status(201).json(company);
	} catch (err) {
		next(err);
	}
}

export async function getCompanyById(req: Request, res: Response, next: NextFunction) {
	try {
		const company = await companyService.getCompanyById(req.params.id, { includeInactive: false });
		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}
		res.json(company);
	} catch (err) {
		next(err);
	}
}
