import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { AddOutreachPersonRequest, CompanyDto, OutreachPerson } from 'jobhuntr-shared';
import { getCompanyById, addCompanyOutreachPerson, removeCompanyOutreachPerson } from '../api/companiesApi';
import { usePopup } from '../features/shared/popup/hooks/usePopup';
import Button from '../features/shared/components/Button';
import Input from '../features/shared/components/Input';

export default function CompanyDetails() {
	const { id } = useParams<{ id: string }>();
	const { alert, confirm, prompt } = usePopup();

	const [company, setCompany] = useState<CompanyDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const emptyPerson: AddOutreachPersonRequest = {
		name: '',
		email: '',
		role: '',
		url: '',
	};
	const [newPerson, setNewPerson] = useState(emptyPerson);
	function updateNewPerson<K extends keyof typeof newPerson>(key: K, value: (typeof newPerson)[K]) {
		setNewPerson((p) => ({ ...p, [key]: value }));
	}

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
			alert({ message: 'No company, cannot add person.' });
			return;
		}

		const created = await addCompanyOutreachPerson(company._id, newPerson);
		setNewPerson(emptyPerson);

		setCompany((current) => {
			if (!current) return current;

			return {
				...current,
				outreach: [...current.outreach, created],
			};
		});
	}

	async function removePerson(person: OutreachPerson) {
		if (!person) return;
		if (!company) {
			alert({ message: 'No company, cannot remove person.' });
			return;
		}
		if (!(await confirm({ message: `Are you sure you want to remove ${person.name}?` }))) return;

		await removeCompanyOutreachPerson(company!._id, person.id);
		setCompany((current) => {
			if (!current) return current;

			return {
				...current,
				outreach: [...current.outreach.filter((p) => p.id !== person.id)],
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
				<div className="card flex items-center gap-2" key={p.id}>
					{p.url ? (
						<a href={p.url} className="text-link">
							{p.name}
						</a>
					) : (
						p.name
					)}
					{p.role && <span>({p.role})</span>}
					{p.email}
					<Button variant="ghost" className="ml-auto" onClick={() => removePerson(p)} aria-label="remove">
						🗑️
					</Button>
				</div>
			))}

			<h2>Add New Outreach</h2>
			<form>
				<Input label="Name" value={newPerson.name} onChange={(v) => updateNewPerson('name', v)} />
				<Input label="Role" value={newPerson.role} onChange={(v) => updateNewPerson('role', v)} />
				<Input label="Url" type="url" value={newPerson.url} onChange={(v) => updateNewPerson('url', v)} />
				<Input label="Email" type="email" value={newPerson.email} onChange={(v) => updateNewPerson('email', v)} />

				<div className="my-4">
					<Button onClick={addPerson}>Add Outreach Person</Button>
				</div>
			</form>
		</div>
	);
}
