import { createPortal } from 'react-dom';
import { PopupSize } from '../types';

export type BasePopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	size?: PopupSize;
	children?: React.ReactNode;
};

export function Popup({ open, onOpenChange, size = 'xl', children }: BasePopupProps) {
	if (!open) return null;

	const sizeClasses = {
		sm: 'w-sm',
		md: 'w-md',
		lg: 'w-lg',
		xl: 'w-xl',
		'2xl': 'w-2xl',
		'3xl': 'w-3xl',
		full: 'w-full',
	};

	const allClasses = 'relative bg-elevated p-4 px-8 pb-8 rounded-lg shadow-2xl shadow-black mx-4 ' + sizeClasses[size];

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)}></div>
			<div className={allClasses} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.body,
	);
}
