import { Router } from 'express';
import {
	getCompanies,
	createCompany,
	getCompanyById,
	addCompanyOutreachPerson,
	removeCompanyOutreachPerson,
	deleteCompany,
	addCompanyOutreachPersonEvent,
	removeCompanyOutreachPersonEvent,
} from './companyController';

const router = Router();

// Company routes
router.get('/', getCompanies);
router.post('/', createCompany);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);

// Outreach routes
router.post('/:companyId/outreach', addCompanyOutreachPerson);
router.delete('/:companyId/outreach/:personId', removeCompanyOutreachPerson);

// Outreach event routes
router.post('/:companyId/outreach/:personId/events', addCompanyOutreachPersonEvent);
router.delete('/:companyId/outreach/:personId/events/:eventId', removeCompanyOutreachPersonEvent);

export default router;
