import { useState } from 'react';
import Confirm from './Confirm';
import Input from '../../components/Input';

type PromptProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	message: string;
	required?: boolean;
	initialValue?: string;
	onConfirm: (value: string) => void | Promise<void>;
	confirmText?: string;
	cancelText?: string;
	children?: React.ReactNode;
};

export default function Prompt({
	open,
	onOpenChange,
	message,
	initialValue = '',
	required = true,
	onConfirm,
	confirmText = 'OK',
	cancelText = 'Cancel',
	children,
}: PromptProps) {
	const [inputValue, setInputValue] = useState(initialValue);
	const [error, setError] = useState('');

	async function handleConfirm() {
		if (required && !inputValue.trim()) {
			setError('This field is required.');
			return;
		}
		await onConfirm(inputValue);
		onOpenChange(false);
	}

	function handleInput(input: string) {
		setInputValue(input);
		if (input.trim()) {
			setError('');
		}
	}

	return (
		<Confirm
			open={open}
			onOpenChange={onOpenChange}
			onConfirm={handleConfirm}
			confirmText={confirmText}
			cancelText={cancelText}
		>
			{children}
			<Input label={message} type="text" value={inputValue} onChange={handleInput} className="w-300px" />
			{error && <div className="text-danger mt-1">{error}</div>}
		</Confirm>
	);
}
