import React from 'react';
import { Popup, BasePopupProps } from './Popup';
import Button from '../../../shared/components/Button';

type AlertProps = BasePopupProps & {
	message?: React.ReactNode;
	onOk?: () => void | Promise<void>;
	okText?: string;
};

export default function Alert({ onOpenChange, message, onOk, okText = 'OK', children, ...rest }: AlertProps) {
	async function handleOk() {
		await onOk?.();
		onOpenChange(false);
	}

	return (
		<Popup onOpenChange={onOpenChange} {...rest}>
			{message && <h3>{message}</h3>}
			{children}
			<div className="flex justify-end mt-10">
				<Button size="lg" onClick={() => handleOk()}>
					{okText}
				</Button>
			</div>
		</Popup>
	);
}
