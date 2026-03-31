import { createContext, useContext, useState } from 'react';
import Alert from './Alert';
import Confirm from './Confirm';

export type AlertOptions = {
	message: string;
	title?: string;
	okText?: string;
};

export type ConfirmOptions = {
	message: string;
	title?: string;
	confirmText?: string;
	cancelText?: string;
};

type PopupJob =
	| {
			id: number;
			type: 'alert';
			options: AlertOptions;
			resolve: () => void;
	  }
	| {
			id: number;
			type: 'confirm';
			options: ConfirmOptions;
			resolve: (value: boolean) => void;
	  };

export type PopupContextValue = {
	alert: (options: AlertOptions) => Promise<void>;
	confirm: (options: ConfirmOptions) => Promise<boolean>;
};

export const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
	const [queue, setQueue] = useState<PopupJob[]>([]);
	const current = queue[0] ?? null;

	function alert(options: AlertOptions) {
		return new Promise<void>((resolve) => {
			setQueue((prev) => [
				...prev,
				{
					id: Date.now(),
					type: 'alert',
					options,
					resolve,
				},
			]);
		});
	}

	function confirm(options: ConfirmOptions) {
		return new Promise<boolean>((resolve) => {
			setQueue((prev) => [
				...prev,
				{
					id: Date.now(),
					type: 'confirm',
					options,
					resolve,
				},
			]);
		});
	}

	function resolveCurrent(value?: boolean) {
		if (!current) return;
		current.resolve(value as any);
		setQueue((prev) => prev.slice(1));
	}

	return (
		<PopupContext.Provider value={{ alert, confirm }}>
			{children}

			{current?.type === 'alert' && (
				<Alert
					open={true}
					message={current.options.message}
					okText={current.options.okText}
					onOpenChange={() => resolveCurrent()}
				/>
			)}

			{current?.type === 'confirm' && (
				<Confirm
					open={true}
					message={current.options.message}
					confirmText={current.options.confirmText}
					cancelText={current.options.cancelText}
					onConfirm={() => resolveCurrent(true)}
					onOpenChange={() => resolveCurrent(false)}
				/>
			)}
		</PopupContext.Provider>
	);
}
