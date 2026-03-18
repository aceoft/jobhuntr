import axios from 'axios';

export function getCompanies() {
	return axios.get('/api/companies').then((res) => res.data);
}
