import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetails from './pages/CompanyDetails';
import HomePage from './pages/HomePage';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{<Route path="/" element={<HomePage />} />}
				<Route path="/companies" element={<CompaniesPage />} />
				<Route path="/companies/:id" element={<CompanyDetails />} />
				{/* <Route path="/applications" element={<ApplicationsPage />} />
				<Route path="/applications/:id" element={<ApplicationDetailPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
}
