import { useId } from 'react';

type AppInputProps = {
	label: string;
	className?: string;
	onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export default function AppInput({ label, id, className, value, onChange, ...rest }: AppInputProps) {
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
