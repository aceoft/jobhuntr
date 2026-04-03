import React from 'react';
//import { useEventTracking } from '../../core/ts/analytics';

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'plain';
type ButtonSize = 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	event?: string;
}

//const eventTracking = useEventTracking();

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, type = 'button', variant = 'primary', size = 'md', event, className, ...rest }, ref) => {
		const combinedClassName = [`btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(' ');

		//const eventAttr = event && event.trim() ? eventTracking.mapEvent(event.trim()) : undefined;

		return (
			<button ref={ref} type={type} className={combinedClassName} /*{...eventAttr}*/ {...rest}>
				{children}
			</button>
		);
	},
);

export default Button;
