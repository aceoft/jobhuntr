import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Companies from './features/company/pages/Companies';
import CompanyDetails from './features/company/pages/CompanyDetails';
import Home from './pages/Home';
import { PopupProvider } from './features/popup/PopupProvider';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PopupProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/companies" element={<Companies />} />
						<Route path="/companies/:id" element={<CompanyDetails />} />
					</Routes>
				</BrowserRouter>
			</PopupProvider>
		</QueryClientProvider>
	);
}
