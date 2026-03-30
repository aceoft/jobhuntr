import { Popup } from './Popup';
import Button from './Button';

type AlertProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	message?: string;
	onOk?: () => void | Promise<void>;
	okText?: string;
	children?: React.ReactNode;
};

export default function Alert({ open, onOpenChange, message, onOk, okText: okText = 'OK', children }: AlertProps) {
	async function handleOk() {
		await onOk?.();
		onOpenChange(false);
	}

	return (
		<Popup open={open} onOpenChange={onOpenChange}>
			{message && <h3>{message}</h3>}
			{children}
			<div className="flex justify-end mt-10">
				<Button size="lg" className="mr-2" onClick={() => handleOk()}>
					{okText}
				</Button>
			</div>
		</Popup>
	);
}
