import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<>
			<h1>JobHuntr</h1>
			<ul>
				<li>
					<Link to="/companies" className="text-link">
						Companies
					</Link>
				</li>
			</ul>
		</>
	);
}
