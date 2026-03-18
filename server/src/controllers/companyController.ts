import * as companyService from '../services/companyService';

export async function getCompanies(req, res, next) {
	try {
		const companies = await companyService.getAllCompanies();
		res.json(companies);
	} catch (err) {
		next(err);
	}
}
