import { useEffect, useState } from 'react';
import { getCompanies } from '../api/companiesApi';
import { CompanyDto } from 'jobhuntr-shared';

export default function CompaniesPage() {
	const [companies, setCompanies] = useState<CompanyDto[]>([]);

	useEffect(() => {
		getCompanies().then(setCompanies);
	}, []);

	return (
		<div style={{ padding: 20 }}>
			<h1>Companies</h1>

			<ul>
				{companies.map((c: CompanyDto) => (
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
