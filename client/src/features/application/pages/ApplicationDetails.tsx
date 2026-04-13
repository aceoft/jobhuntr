import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import * as applicationsApi from '../../application/api/applicationsApi';

export default function ApplicationDetails() {
	const { companyId, applicationId } = useParams<{ companyId: string; applicationId: string }>();
	const applicationQueryKey = ['application', applicationId] as const;

	// Application query
	const { isPending: applicationsPending, data: application } = useQuery({
		queryKey: applicationQueryKey,
		queryFn: () => applicationsApi.getApplicationById(companyId!, applicationId!),
		enabled: Boolean(companyId && applicationId),
	});

	return (
		<div>
			<h1>
				<Link to="/">JobHuntr</Link> » <Link to="/companies">Companies</Link> »{' '}
				<Link to={`/companies/${companyId}`}>{application?.companyNameSnapshot}</Link>
			</h1>

			{applicationsPending && <p>Loading application...</p>}

			{application && (
				<div>
					<h2>{application.roleTitle}</h2>
					<p>{application.appliedAt?.toString()}</p>
				</div>
			)}
		</div>
	);
}
