import { Router } from 'express';
import * as companyController from './companyController';
import * as applicationController from '../application/applicationController';

const router = Router();

// Company routes
router.get('/', companyController.getCompanies);
router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompanyById);
router.delete('/:id', companyController.deleteCompany);

// Outreach routes
router.post('/:companyId/outreach', companyController.addCompanyOutreachPerson);
router.delete('/:companyId/outreach/:personId', companyController.removeCompanyOutreachPerson);

// Outreach event routes
router.post('/:companyId/outreach/:personId/events', companyController.addCompanyOutreachPersonEvent);
router.delete('/:companyId/outreach/:personId/events/:eventId', companyController.removeCompanyOutreachPersonEvent);

// Applications
router.get('/:companyId/applications', applicationController.getApplicationsForCompanyById);
router.get('/:companyId/applications/:applicationId', applicationController.getApplicationById);
router.post('/:companyId/applications', applicationController.createApplication);
router.delete('/:companyId/applications/:applicationId', applicationController.deleteApplication);

export default router;
