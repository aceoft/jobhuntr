import { createPortal } from 'react-dom';

type PopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export function Popup({ open, onOpenChange, children }: PopupProps) {
	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)}></div>
			<div className="relative bg-elevated p-4 rounded shadow max-w-xl" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.body,
	);
}
