import { useId } from 'react';

type InputProps = {
	label?: React.ReactNode;
	className?: string;
	onChange: (value: boolean) => void;
	fluid?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'>;

export default function Input({ label, id, className, value, onChange, fluid, ...rest }: InputProps) {
	const combinedClassName = ['mr-2', className].filter(Boolean).join(' ');
	const inputId = id ?? useId();

	return (
		<div className={fluid ? 'w-full' : undefined}>
			{label ? (
				<label htmlFor={inputId}>
					<input
						id={inputId}
						className={combinedClassName}
						value={value}
						onChange={(e) => onChange(e.target.checked)}
						type="checkbox"
						{...rest}
					/>
					{label}
				</label>
			) : (
				<input
					id={inputId}
					className={combinedClassName}
					value={value}
					onChange={(e) => onChange(e.target.checked)}
					type="checkbox"
					{...rest}
				/>
			)}
		</div>
	);
}
