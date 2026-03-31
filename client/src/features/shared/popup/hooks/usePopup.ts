// usePopup.ts
import { useContext } from 'react';
import { PopupContext } from '../components/PopupProvider';

export function usePopup() {
	const ctx = useContext(PopupContext);

	if (!ctx) {
		throw new Error('usePopup must be used within PopupProvider');
	}

	return ctx;
}
