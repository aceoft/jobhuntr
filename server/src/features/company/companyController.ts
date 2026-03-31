import type { Request, Response, NextFunction } from 'express';
import type { CreateCompanyRequest } from 'jobhuntr-shared';
import * as companyService from './companyService';

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

export async function deleteCompany(req: Request, res: Response, next: NextFunction) {
	try {
		await companyService.deleteCompany(req.params.id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}

export async function addCompanyOutreachPerson(req: Request, res: Response, next: NextFunction) {
	try {
		const person = await companyService.addCompanyOutreachPerson(req.params.companyId, req.body);
		if (!person) {
			return res.status(404).json({ message: 'Company not found' });
		}
		res.json(person);
	} catch (err) {
		next(err);
	}
}

export async function removeCompanyOutreachPerson(req: Request, res: Response, next: NextFunction) {
	try {
		await companyService.removeCompanyOutreachPerson(req.params.companyId, req.params.personId);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
