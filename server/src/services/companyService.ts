import Company from '../models/Company';

export async function getAllCompanies() {
	return Company.find({ active: true }).sort({ name: 1 });
}
