import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, getCompanies } from '../api/companiesApi';
import Confirm from '../../popup/components/Confirm';
import Button from '../../../shared/components/Button';

const companiesQueryKey = ['companies'];

export default function Companies() {
	const [name, setName] = useState('');
	const [careersUrl, setCareersUrl] = useState('');
	const [addingCompany, setAddingCompany] = useState(false);
	const queryClient = useQueryClient();

	const {
		isPending,
		error,
		data: companies,
	} = useQuery({
		queryKey: companiesQueryKey,
		queryFn: getCompanies,
	});

	const { mutate: mutateCreateCompany } = useMutation({
		mutationFn: createCompany,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companiesQueryKey });
			setName('');
			setCareersUrl('');
		},
	});

	function addCompany() {
		mutateCreateCompany({
			name,
			careersUrl: careersUrl || undefined,
		});
	}

	return (
		<div>
			<h1>
				<Link to="/">JobHuntr</Link> » Companies
			</h1>

			{isPending && <p>Loading companies...</p>}
			{error && <p>Unable to load companies.</p>}

			{companies && companies.length ? (
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Careers</th>
						</tr>
					</thead>
					<tbody>
						{companies.map((c) => (
							<tr key={c._id}>
								<td>
									<Link to={`/companies/${c._id}`} className="text-link">
										{c.name}
									</Link>
								</td>
								<td>
									{c.careersUrl && (
										<a href={c.careersUrl} target="_blank" rel="noreferrer noopener">
											careers link
										</a>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No companies yet.</p>
			)}

			<p>
				<Button onClick={() => setAddingCompany(true)}>Add Company</Button>
			</p>

			<Confirm
				open={addingCompany}
				onOpenChange={setAddingCompany}
				confirmText="Add Company"
				cancelText="Cancel"
				onConfirm={addCompany}
			>
				<h2>Add New Company</h2>
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
				</form>
			</Confirm>
		</div>
	);
}
