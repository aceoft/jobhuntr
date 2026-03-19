import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CompanyDto } from 'jobhuntr-shared';
import { getCompanyById } from '../api/companiesApi';
import AppButton from '../components/AppButton';

export default function CompanyDetailsPage() {
	const { id } = useParams<{ id: string }>();

	const [company, setCompany] = useState<CompanyDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function loadCompany() {
			if (!id) {
				setError('Missing company id.');
				setLoading(false);
				return;
			}

			try {
				const result = await getCompanyById(id);
				setCompany(result);
			} catch (err) {
				console.error(err);
				setError('Failed to load company.');
			} finally {
				setLoading(false);
			}
		}

		loadCompany();
	}, [id]);

	if (loading) {
		return <div>Loading company...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!company) {
		return <div>Company not found.</div>;
	}

	return (
		<div>
			<div className="my-4">
				<Link to="/companies">← Back to Companies</Link>
			</div>

			<h1>{company.name}</h1>

			<div className="my-4">
				<label className="label">Company Name</label>
				<div className="input">{company.name}</div>
			</div>

			<div className="my-4">
				<label className="label">Careers Url</label>
				<div className="input">
					{company.careersUrl ? (
						<a href={company.careersUrl} target="_blank" rel="noreferrer noopener">
							{company.careersUrl}
						</a>
					) : (
						<span>No careers URL</span>
					)}
				</div>
			</div>

			{/* <div className="my-4">
				<AppButton variant="primary">Edit Company</AppButton>
			</div> */}
		</div>
	);
}
