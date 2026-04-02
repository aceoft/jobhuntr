import { Popup } from './Popup';
import Button from '../../../shared/components/Button';
import { PopupSize } from '../types';

type ConfirmProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	message?: string;
	size?: PopupSize;
	onConfirm: () => void | Promise<void>;
	confirmText?: string;
	cancelText?: string;
	children?: React.ReactNode;
};

export default function Confirm({
	open,
	onOpenChange,
	message,
	size,
	onConfirm,
	confirmText = 'Yes',
	cancelText = 'No',
	children,
}: ConfirmProps) {
	function handleClose() {
		onOpenChange(false);
	}

	async function handleConfirm() {
		await onConfirm();
		onOpenChange(false);
	}

	return (
		<Popup open={open} onOpenChange={onOpenChange} size={size}>
			{message && <h3>{message}</h3>}
			{children}
			<div className="flex justify-end mt-10">
				<Button size="lg" className="mr-2 min-w-90px" onClick={() => handleConfirm()}>
					{confirmText}
				</Button>
				<Button size="lg" variant="ghost" className="min-w-90px" onClick={() => handleClose()}>
					{cancelText}
				</Button>
			</div>
		</Popup>
	);
}
