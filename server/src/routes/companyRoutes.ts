import { Router } from 'express';
import { getCompanies, createCompany, getCompanyById } from '../controllers/companyController';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', createCompany);

export default router;
