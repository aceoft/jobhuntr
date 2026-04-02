import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Companies from './features/company/pages/Companies';
import CompanyDetails from './features/company/pages/CompanyDetails';
import Home from './pages/Home';
import { PopupProvider } from './features/popup/PopupProvider';

export default function App() {
	return (
		<PopupProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/companies" element={<Companies />} />
					<Route path="/companies/:id" element={<CompanyDetails />} />
				</Routes>
			</BrowserRouter>
		</PopupProvider>
	);
}
