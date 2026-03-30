import { Popup } from './Popup';
import Button from './Button';

type ConfirmProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	message: string;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
};

export default function Confirm({
	open,
	onOpenChange,
	message,
	onConfirm,
	confirmText: confirmText = 'Yes',
	cancelText: cancelText = 'No',
}: ConfirmProps) {
	function handleClose() {
		onOpenChange(false);
	}

	function handleConfirm() {
		onConfirm();
		onOpenChange(false);
	}

	return (
		<Popup open={open} onOpenChange={onOpenChange}>
			<h3>{message}</h3>
			<div className="flex justify-end mt-10">
				<Button size="lg" className="mr-2" onClick={() => handleConfirm()}>
					{confirmText}
				</Button>
				<Button size="lg" onClick={() => handleClose()}>
					{cancelText}
				</Button>
			</div>
		</Popup>
	);
}
