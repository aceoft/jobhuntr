import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'virtual:uno.css';
import './css/app.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
