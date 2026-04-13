import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
	AddOutreachPersonRequest,
	ApplicationDto,
	CreateApplicationRequest,
	OutreachEvent,
	OutreachPerson,
} from 'jobhuntr-shared';
import * as companiesApi from '../api/companiesApi';
import * as applicationsApi from '../../application/api/applicationsApi';
import { usePopup } from '../../popup/hooks/usePopup';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import Confirm from '../../popup/components/Confirm';
import Alert from '../../popup/components/Alert';
import OutreachPersonDetails from '../../outreach/components/OutreachPersonDetails';

const emptyPerson: AddOutreachPersonRequest = {
	name: '',
	email: '',
	role: '',
	url: '',
};

const emptyApplication: CreateApplicationRequest = {
	roleTitle: '',
	postingUrl: '',
	level: 'staff',
	status: 'applied',
	postedAt: new Date(), // overridden server-side
	postingAgeDaysAtApply: 0,
	postingSource: '',
	resumeUsed: '',
	salaryRangeLow: 0,
	salaryRangeHigh: 0,
};

export default function CompanyDetails() {
	const { id } = useParams<{ id: string }>();
	const { alert, confirm } = usePopup();

	const [addingApplication, setAddingApplication] = useState(false);
	const [addingOutreachPerson, setAddingOutreachPerson] = useState(false);
	const [viewingOutreachPerson, setViewingOutreachPerson] = useState(false);
	const [selectedOutreachPersonId, setSelectedOutreachPersonId] = useState<string | null>(null);

	const [newPerson, setNewPerson] = useState(emptyPerson);
	function updateNewPerson<K extends keyof typeof newPerson>(key: K, value: (typeof newPerson)[K]) {
		setNewPerson((p) => ({ ...p, [key]: value }));
	}

	const [newApplication, setNewApplication] = useState(emptyApplication);
	function updateNewApplication<K extends keyof typeof newApplication>(key: K, value: (typeof newApplication)[K]) {
		setNewApplication((p) => ({ ...p, [key]: value }));
	}

	const queryClient = useQueryClient();

	const companyQueryKey = ['companies', id] as const;
	const companyApplicationsQueryKey = ['companies', id, 'applications'] as const;

	// Company query
	const { isPending: companyPending, data: company } = useQuery({
		queryKey: companyQueryKey,
		queryFn: () => companiesApi.getCompanyById(id!),
		enabled: Boolean(id),
	});

	// Applications query
	const { isPending: applicationsPending, data: applications } = useQuery({
		queryKey: companyApplicationsQueryKey,
		queryFn: () => applicationsApi.getApplicationsForCompanyId(id!),
		enabled: Boolean(id),
	});

	// Outreach person mutations
	const { mutate: mutateAddOutreachPerson } = useMutation({
		mutationFn: (data: AddOutreachPersonRequest) => companiesApi.addCompanyOutreachPerson(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyQueryKey });
			setNewPerson(emptyPerson);
		},
	});
	const { mutate: mutateRemoveOutreachPerson } = useMutation({
		mutationFn: (personId: string) => companiesApi.removeCompanyOutreachPerson(id!, personId),
		onSuccess: (_data, personId) => {
			queryClient.invalidateQueries({ queryKey: companyQueryKey });
			if (selectedOutreachPersonId === personId) {
				setSelectedOutreachPersonId(null);
			}
		},
	});

	// Outreach person event mutations
	const { mutate: mutateAddOutreachPersonEvent } = useMutation({
		mutationFn: (data: OutreachEvent) =>
			companiesApi.addCompanyOutreachPersonEvent(id!, selectedOutreachPersonId!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyQueryKey });
		},
	});
	const { mutate: mutateRemoveOutreachPersonEvent } = useMutation({
		mutationFn: ({ personId, eventId }: { personId: string; eventId: string }) =>
			companiesApi.removeCompanyOutreachPersonEvent(id!, personId, eventId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyQueryKey });
		},
	});

	// Application mutations
	const { mutate: mutateAddApplication } = useMutation({
		mutationFn: (data: CreateApplicationRequest) => applicationsApi.createApplication(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyApplicationsQueryKey });
			setNewApplication(emptyApplication);
		},
	});
	const { mutate: mutateDeleteApplication } = useMutation({
		mutationFn: (applicationId: string) => applicationsApi.deleteApplication(id!, applicationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyApplicationsQueryKey });
		},
	});

	const selectedOutreachPerson = company?.outreach.find((p) => p.id === selectedOutreachPersonId) ?? null;

	function addApplication() {
		if (!company) {
			alert({ message: 'No company, cannot add application.' });
			return;
		}

		mutateAddApplication(newApplication);
	}

	async function handleRemoveApplication(application: ApplicationDto) {
		if (!application) return;
		if (!company) {
			alert({ message: 'No company, cannot remove application.' });
			return;
		}
		if (!(await confirm({ message: `Are you sure you want to remove ${application.roleTitle}?` }))) return;

		mutateDeleteApplication(application._id);
	}

	function addPerson() {
		if (!company) {
			alert({ message: 'No company, cannot add person.' });
			return;
		}

		mutateAddOutreachPerson(newPerson);
	}

	async function handleRemovePerson(person: OutreachPerson) {
		if (!person) return;
		if (!company) {
			alert({ message: 'No company, cannot remove person.' });
			return;
		}
		if (!(await confirm({ message: `Are you sure you want to remove ${person.name}?` }))) return;

		mutateRemoveOutreachPerson(person.id);
	}

	function handleSelectPerson(person: OutreachPerson) {
		setSelectedOutreachPersonId(person.id);
		setViewingOutreachPerson(true);
	}

	async function handleEventAdded(event: OutreachEvent) {
		if (!company) return;
		if (!selectedOutreachPersonId) return;

		mutateAddOutreachPersonEvent(event);
	}

	async function handleEventRemoved(id: string) {
		if (!company) return;
		if (!selectedOutreachPersonId) return;
		if (!id.trim()) return;

		mutateRemoveOutreachPersonEvent({ personId: selectedOutreachPersonId, eventId: id });
	}

	async function handleDeleteCompany() {
		if (!company) return;
		if (!(await confirm({ message: `Are you sure you want to delete ${company.name}? This action cannot be undone.` })))
			return;

		await companiesApi.deleteCompany(company._id);
		window.location.href = '/companies';
	}

	return (
		<div>
			<h1>
				<Link to="/">JobHuntr</Link> » <Link to="/companies">Companies</Link> » {company?.name}
			</h1>

			{companyPending ? (
				<p>Loading...</p>
			) : (
				company && (
					<>
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
					</>
				)
			)}

			<h2>Applications</h2>

			{applicationsPending && <p>Loading applications...</p>}
			{applications &&
				applications.map((a) => (
					<div className="card flex items-center gap-2 my-2" key={a._id}>
						{a.roleTitle}
						{
							/* <Button variant="ghost" onClick={() => handleSelectPerson(a)} aria-label="view">
				View
			</Button>*/
							<Button
								variant="ghost"
								className="ml-auto"
								onClick={() => handleRemoveApplication(a)}
								aria-label="remove"
							>
								🗑️
							</Button>
						}
					</div>
				))}

			<p>
				<Button onClick={() => setAddingApplication(true)}>Add Application</Button>
			</p>

			<Confirm
				open={addingApplication}
				onOpenChange={setAddingApplication}
				onConfirm={addApplication}
				confirmText="Add"
				cancelText="Cancel"
				size="3xl"
			>
				<h2>Add New Application</h2>
				<form>
					<Input
						label="Role Title"
						value={newApplication.roleTitle}
						onChange={(v) => updateNewApplication('roleTitle', v)}
					/>
				</form>
			</Confirm>

			<h2>Outreach</h2>

			{companyPending && <p>Loading...</p>}

			{company &&
				company.outreach.map((p) => (
					<div className="card flex items-center gap-2 my-2" key={p.id}>
						{p.name}
						{p.role && <span>({p.role})</span>}
						<Button variant="ghost" onClick={() => handleSelectPerson(p)} aria-label="view">
							View
						</Button>
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
					<OutreachPersonDetails
						person={selectedOutreachPerson}
						eventAdded={handleEventAdded}
						eventRemoved={handleEventRemoved}
					/>
				)}
			</Alert>
		</div>
	);
}
