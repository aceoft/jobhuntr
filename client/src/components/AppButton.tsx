import React from 'react';
//import { useEventTracking } from '../../core/ts/analytics';

type AppButtonVariant = 'primary' | 'ghost';
type AppButtonSize = 'md' | 'lg';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: AppButtonVariant;
	size?: AppButtonSize;
	event?: string;
}

//const eventTracking = useEventTracking();

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
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

export default AppButton;
