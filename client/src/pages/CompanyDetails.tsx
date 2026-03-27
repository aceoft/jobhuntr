import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CompanyDto } from 'jobhuntr-shared';
import { getCompanyById, addCompanyOutreachPerson, removeCompanyOutreachPerson } from '../api/companiesApi';
import AppButton from '../components/AppButton';

export default function CompanyDetailsPage() {
	const { id } = useParams<{ id: string }>();

	const [company, setCompany] = useState<CompanyDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [newPersonName, setNewPersonName] = useState('');
	const [newPersonEmail, setNewPersonEmail] = useState('');
	const [newPersonRole, setNewPersonRole] = useState('');
	const [newPersonUrl, setNewPersonUrl] = useState('');

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

	async function addPerson() {
		if (!company) {
			setError('No company, cannot add person.');
			return;
		}
		const created = await addCompanyOutreachPerson(company._id, {
			name: newPersonName,
			email: newPersonEmail,
			role: newPersonRole,
			url: newPersonUrl,
		});
		setNewPersonName('');
		setNewPersonEmail('');
		setNewPersonRole('');
		setNewPersonUrl('');
		setCompany((current) => {
			if (!current) return current;

			return {
				...current,
				outreach: [...current.outreach, created],
			};
		});
	}

	async function removePerson(id: string) {
		if (!company) {
			setError('No company, cannot add person.');
			return;
		}
		if (!id) return;
		await removeCompanyOutreachPerson(company._id, id);
		setCompany((current) => {
			if (!current) return current;

			return {
				...current,
				outreach: [...current.outreach.filter((p) => p.id !== id)],
			};
		});
	}

	return (
		<div>
			<h1>
				<Link to="/">JobHuntr</Link> » <Link to="/companies">Companies</Link> » {company.name}
			</h1>

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

			<h2>Outreach</h2>

			{company.outreach.map((p) => (
				<div className="card flex! items-center gap-2" key={p.id}>
					{p.url ? (
						<a href={p.url} className="text-link">
							{p.name}
						</a>
					) : (
						p.name
					)}
					{p.role && <span>({p.role})</span>}
					{p.email}
					<AppButton variant="ghost" className="ml-auto" onClick={() => removePerson(p.id)} aria-label="remove">
						🗑️
					</AppButton>
				</div>
			))}

			<h2>Add New Outreach</h2>
			<form>
				<div className="my-4">
					<label className="label" htmlFor="person-name">
						Name
					</label>
					<input
						className="input"
						id="person-name"
						value={newPersonName}
						onChange={(e) => setNewPersonName(e.target.value)}
					/>
				</div>
				<div className="my-4">
					<label className="label" htmlFor="person-email">
						Email
					</label>
					<input
						className="input"
						id="person-email"
						value={newPersonEmail}
						onChange={(e) => setNewPersonEmail(e.target.value)}
					/>
				</div>
				<div className="my-4">
					<label className="label" htmlFor="person-role">
						Role
					</label>
					<input
						className="input"
						id="person-role"
						value={newPersonRole}
						onChange={(e) => setNewPersonRole(e.target.value)}
					/>
				</div>
				<div className="my-4">
					<label className="label" htmlFor="person-url">
						Url
					</label>
					<input
						className="input"
						id="person-url"
						value={newPersonUrl}
						onChange={(e) => setNewPersonUrl(e.target.value)}
					/>
				</div>

				<div className="my-4">
					<AppButton onClick={addPerson}>Add Outreach Person</AppButton>
				</div>
			</form>
		</div>
	);
}
