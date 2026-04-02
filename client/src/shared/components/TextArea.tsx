import { useId } from 'react';

type TextAreaProps = {
	label?: React.ReactNode;
	className?: string;
	onChange: (value: string) => void;
	fluid?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

export default function TextArea({ label, id, className, value, onChange, fluid, ...rest }: TextAreaProps) {
	const combinedClassName = ['input', className].filter(Boolean).join(' ');
	const inputId = id ?? useId();

	return (
		<div className={fluid ? 'w-full' : undefined}>
			{label && (
				<label className="label" htmlFor={inputId}>
					{label}
				</label>
			)}
			<textarea
				id={inputId}
				className={combinedClassName}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				{...rest}
			/>
		</div>
	);
}
