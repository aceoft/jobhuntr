import { useEffect, useState } from 'react';
import type { CompanyDto } from 'jobhuntr-shared';
import { createCompany, getCompanies } from '../api/companiesApi';

export default function CompaniesPage() {
	const [companies, setCompanies] = useState<CompanyDto[]>([]);
	const [name, setName] = useState('');
	const [careersUrl, setCareersUrl] = useState('');

	useEffect(() => {
		getCompanies().then(setCompanies);
	}, []);

	async function handleSubmit() {
		const created = await createCompany({
			name,
			careersUrl: careersUrl || undefined,
		});

		setCompanies((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
		setName('');
		setCareersUrl('');
	}

	return (
		<div>
			<h1>Companies</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={{ marginBottom: 20 }}
			>
				<div>
					<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name" />
				</div>

				<div style={{ marginTop: 8 }}>
					<input value={careersUrl} onChange={(e) => setCareersUrl(e.target.value)} placeholder="Careers URL" />
				</div>

				<div style={{ marginTop: 8 }}>
					<button type="submit">Add Company</button>
				</div>
			</form>

			<ul>
				{companies.map((c) => (
					<li key={c._id}>
						<strong>{c.name}</strong>{' '}
						{c.careersUrl && (
							<a href={c.careersUrl} target="_blank" rel="noreferrer">
								careers
							</a>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
