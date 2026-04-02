import React from 'react';
import { Popup, BasePopupProps } from './Popup';
import Button from '../../../shared/components/Button';

export type ConfirmProps = BasePopupProps & {
	message?: React.ReactNode;
	onConfirm: () => void | Promise<void>;
	confirmText?: string;
	cancelText?: string;
};

export default function Confirm({
	onOpenChange,
	message,
	onConfirm,
	confirmText = 'Yes',
	cancelText = 'No',
	children,
	...rest
}: ConfirmProps) {
	function handleClose() {
		onOpenChange(false);
	}

	async function handleConfirm() {
		await onConfirm();
		onOpenChange(false);
	}

	return (
		<Popup onOpenChange={onOpenChange} {...rest}>
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
