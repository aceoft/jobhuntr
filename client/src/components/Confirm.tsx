import { Popup } from './Popup';
import Button from './Button';

type ConfirmProps = {
	open: boolean;
	message: string;
	onConfirm: () => void;
	close: () => void;
	confirmText?: string;
	cancelText?: string;
};

export default function Confirm({
	open,
	message,
	onConfirm,
	close,
	confirmText: confirmText = 'Yes',
	cancelText: cancelText = 'No',
}: ConfirmProps) {
	return (
		<Popup open={open} onClose={() => close()}>
			<h3>{message}</h3>
			<div className="flex justify-end mt-10">
				<Button
					size="lg"
					className="mr-2"
					onClick={() => {
						onConfirm();
						close();
					}}
				>
					{confirmText}
				</Button>
				<Button size="lg" onClick={() => close()}>
					{cancelText}
				</Button>
			</div>
		</Popup>
	);
}
