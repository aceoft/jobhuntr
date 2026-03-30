import { createPortal } from 'react-dom';

type PopupProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export function Popup({ open, onClose, children }: PopupProps) {
	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
			<div className="relative bg-elevated p-4 rounded shadow max-w-xl">{children}</div>
		</div>,
		document.body,
	);
}
