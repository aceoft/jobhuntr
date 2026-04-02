import { useContext } from 'react';
import { PopupContext } from '../PopupProvider';

export function usePopup() {
	const ctx = useContext(PopupContext);

	if (!ctx) {
		throw new Error('usePopup must be used within PopupProvider');
	}

	return ctx;
}
