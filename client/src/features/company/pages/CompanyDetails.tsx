import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { AddOutreachPersonRequest, CompanyDto, OutreachEvent, OutreachPerson } from 'jobhuntr-shared';
import {
	getCompanyById,
	addCompanyOutreachPerson,
	removeCompanyOutreachPerson,
	deleteCompany,
} from '../api/companiesApi';
import { usePopup } from '../../popup/hooks/usePopup';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import Confirm from '../../popup/components/Confirm';
import { Popup } from '../../popup/components/Popup';
import Alert from '../../popup/components/Alert';
import OutreachPersonDetails from '../../outreach/components/OutreachPersonDetails';

export default function CompanyDetails() {
	const { id } = useParams<{ id: string }>();
	const { alert, confirm, prompt } = usePopup();

	const [company, setCompany] = useState<CompanyDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [addingOutreachPerson, setAddingOutreachPerson] = useState(false);
	const [viewingOutreachPerson, setViewingOutreachPerson] = useState(false);
	const [selectedOutreachPersonId, setSelectedOutreachPersonId] = useState<string | null>(null);

	const selectedOutreachPerson = company?.outreach.find((p) => p.id === selectedOutreachPersonId) ?? null;

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

	async function handleRemovePerson(person: OutreachPerson) {
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

	function handleSelectPerson(person: OutreachPerson) {
		setSelectedOutreachPersonId(person.id);
		setViewingOutreachPerson(true);
	}

	async function handleEventAdded(event: OutreachEvent) {
		if (!selectedOutreachPerson) return;
		if (!company) return;

		setCompany((current) => {
			if (!current) return current;

			return {
				...current,
				outreach: current.outreach.map((person) => {
					if (person.id !== selectedOutreachPersonId) return person;

					return {
						...person,
						events: [...person.events, event],
					};
				}),
			};
		});
	}

	async function handleDeleteCompany() {
		if (!company) return;
		if (!(await confirm({ message: `Are you sure you want to delete ${company.name}? This action cannot be undone.` })))
			return;

		await deleteCompany(company._id);
		window.location.href = '/companies';
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
				<div className="card flex items-center gap-2 my-2" key={p.id}>
					{p.name}
					<Button variant="ghost" onClick={() => handleSelectPerson(p)} aria-label="view">
						View
					</Button>
					{p.url && (
						<a href={p.url} className="text-link">
							{p.name}
						</a>
					)}
					{p.role && <span>({p.role})</span>}
					{p.email}
					<Button variant="ghost" className="ml-auto" onClick={() => handleRemovePerson(p)} aria-label="remove">
						🗑️
					</Button>
				</div>
			))}

			<p>
				<Button onClick={() => setAddingOutreachPerson(true)}>Add Outreach Person</Button>
			</p>

			<Confirm
				open={addingOutreachPerson}
				onOpenChange={setAddingOutreachPerson}
				onConfirm={addPerson}
				confirmText="Add"
				cancelText="Cancel"
				size="3xl"
			>
				<h2>Add New Outreach</h2>
				<form>
					<Input label="Name" value={newPerson.name} onChange={(v) => updateNewPerson('name', v)} />
					<Input label="Role" value={newPerson.role} onChange={(v) => updateNewPerson('role', v)} />
					<Input label="Url" type="url" value={newPerson.url} onChange={(v) => updateNewPerson('url', v)} />
					<Input label="Email" type="email" value={newPerson.email} onChange={(v) => updateNewPerson('email', v)} />
				</form>
			</Confirm>

			<h2>Danger Zone</h2>
			<p>
				<Button variant="danger" onClick={handleDeleteCompany}>
					Delete Company
				</Button>
			</p>

			<Alert open={viewingOutreachPerson} onOpenChange={setViewingOutreachPerson} okText="Done" size="2xl">
				{selectedOutreachPerson && (
					<OutreachPersonDetails person={selectedOutreachPerson} eventAdded={handleEventAdded} />
				)}
			</Alert>
		</div>
	);
}
