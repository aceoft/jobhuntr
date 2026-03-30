import { useId } from 'react';

type InputProps = {
	label: string;
	className?: string;
	onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export default function Input({ label, id, className, value, onChange, ...rest }: InputProps) {
	const combinedClassName = ['input', className].filter(Boolean).join(' ');
	const inputId = id ?? useId();

	return (
		<div className="my-4">
			<label className="label" htmlFor={inputId}>
				{label}
			</label>
			<input
				id={inputId}
				className={combinedClassName}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				{...rest}
			/>
		</div>
	);
}
