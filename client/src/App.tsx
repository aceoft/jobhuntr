import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import Home from './pages/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{<Route path="/" element={<Home />} />}
				<Route path="/companies" element={<Companies />} />
				<Route path="/companies/:id" element={<CompanyDetails />} />
				{/* <Route path="/applications" element={<ApplicationsPage />} />
				<Route path="/applications/:id" element={<ApplicationDetailPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
}
