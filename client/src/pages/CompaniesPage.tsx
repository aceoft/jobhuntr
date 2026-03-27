import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CompanyDto } from 'jobhuntr-shared';
import { createCompany, getCompanies } from '../api/companiesApi';
import AppButton from '../components/AppButton';

export default function CompaniesPage() {
	const [companies, setCompanies] = useState<CompanyDto[]>([]);
	const [name, setName] = useState('');
	const [careersUrl, setCareersUrl] = useState('');

	useEffect(() => {
		getCompanies().then(setCompanies);
	}, []);

	async function addCompany() {
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
			<h1>
				<Link to="/">JobHuntr</Link> » Companies
			</h1>

			<form>
				<div className="my-4">
					<label className="label" htmlFor="company-name">
						Company Name
					</label>
					<input className="input" id="company-name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className="my-4">
					<label className="label" htmlFor="careers-url">
						Careers Url
					</label>
					<input
						className="input"
						id="careers-url"
						value={careersUrl}
						onChange={(e) => setCareersUrl(e.target.value)}
					/>
				</div>

				<div className="my-4">
					<AppButton variant="primary" onClick={addCompany}>
						Add Company
					</AppButton>
				</div>
			</form>

			<h2>Company List</h2>
			<ul>
				{companies.map((c) => (
					<li key={c._id}>
						<strong>
							<Link to={`/companies/${c._id}`} className="text-link">
								{c.name}
							</Link>
						</strong>{' '}
						{c.careersUrl && (
							<a href={c.careersUrl} target="_blank" rel="noreferrer noopener">
								careers
							</a>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
