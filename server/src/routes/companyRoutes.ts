import { Router } from 'express';
import {
	getCompanies,
	createCompany,
	getCompanyById,
	addCompanyOutreachPerson,
	removeCompanyOutreachPerson,
	deleteCompany,
} from '../controllers/companyController';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);
router.post('/', createCompany);
router.post('/:companyId/outreach', addCompanyOutreachPerson);
router.delete('/:companyId/outreach/:personId', removeCompanyOutreachPerson);

export default router;
