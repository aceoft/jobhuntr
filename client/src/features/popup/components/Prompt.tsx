import { useState } from 'react';
import Confirm, { ConfirmProps } from './Confirm';
import Input from '../../../shared/components/Input';

type PromptProps = Omit<ConfirmProps, 'onConfirm'> & {
	required?: boolean;
	onConfirm: (value: string) => void | Promise<void>;
	initialValue?: string;
};

export default function Prompt({
	onOpenChange,
	message,
	initialValue = '',
	required = true,
	onConfirm,
	children,
	...rest
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
		<Confirm onOpenChange={onOpenChange} onConfirm={handleConfirm} {...rest}>
			{children}
			<Input label={message} type="text" value={inputValue} onChange={handleInput} className="min-w-300px w-full" />
			{error && <div className="text-danger mt-1">{error}</div>}
		</Confirm>
	);
}
