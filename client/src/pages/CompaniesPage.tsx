import { useEffect, useState } from 'react';
import { getCompanies } from '../api/companiesApi';

export default function CompaniesPage() {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		getCompanies().then(setCompanies);
	}, []);

	return (
		<div style={{ padding: 20 }}>
			<h1>Companies</h1>

			<ul>
				{companies.map((c: any) => (
					<li key={c._id}>
						<strong>{c.name}</strong>{' '}
						{c.careersUrl && (
							<a href={c.careersUrl} target="_blank" className="text-link">
								careers
							</a>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
