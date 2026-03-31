import { createContext, useState } from 'react';
import Alert from './Alert';
import Confirm from './Confirm';
import Prompt from './Prompt';

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

export type PromptOptions = {
	message: string;
	required?: boolean;
	initialValue?: string;
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
	  }
	| {
			id: number;
			type: 'prompt';
			options: PromptOptions;
			resolve: (value: string | undefined) => void;
	  };

export type PopupContextValue = {
	alert: (options: AlertOptions) => Promise<void>;
	confirm: (options: ConfirmOptions) => Promise<boolean>;
	prompt: (options: PromptOptions) => Promise<string | undefined>;
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

	function prompt(options: PromptOptions) {
		return new Promise<string | undefined>((resolve) => {
			setQueue((prev) => [
				...prev,
				{
					id: Date.now(),
					type: 'prompt',
					options,
					resolve,
				},
			]);
		});
	}

	function removeCurrent() {
		if (!current) return;
		setQueue((prev) => prev.slice(1));
	}

	return (
		<PopupContext.Provider value={{ alert, confirm, prompt }}>
			{children}

			{current?.type === 'alert' && (
				<Alert
					open={true}
					message={current.options.message}
					okText={current.options.okText}
					onOpenChange={() => {
						current.resolve();
						removeCurrent();
					}}
				/>
			)}

			{current?.type === 'confirm' && (
				<Confirm
					open={true}
					message={current.options.message}
					confirmText={current.options.confirmText}
					cancelText={current.options.cancelText}
					onConfirm={() => {
						current.resolve(true);
						removeCurrent();
					}}
					onOpenChange={() => {
						current.resolve(false);
						removeCurrent();
					}}
				/>
			)}

			{current?.type === 'prompt' && (
				<Prompt
					open={true}
					message={current.options.message}
					required={current.options.required}
					initialValue={current.options.initialValue}
					confirmText={current.options.confirmText}
					cancelText={current.options.cancelText}
					onConfirm={(value) => {
						current.resolve(value);
						removeCurrent();
					}}
					onOpenChange={() => {
						current.resolve(undefined);
						removeCurrent();
					}}
				/>
			)}
		</PopupContext.Provider>
	);
}
