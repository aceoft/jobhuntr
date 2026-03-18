import presetWind3 from '@unocss/preset-wind3';
import presetIcons from '@unocss/preset-icons';
import { MDI_ICONS } from './icons';

export const presets = [presetWind3(), presetIcons()];

export const colors = {
	bg: 'var(--color-bg)',
	'bg-dark': 'var(--color-bg-dark)',
	surface: 'var(--color-surface)',
	elevated: 'var(--color-elevated)',
	text: 'var(--color-text)',
	muted: 'var(--color-muted)',
	border: 'var(--color-border)',
	'border-full': 'var(--color-border-full)',
	accent: 'var(--color-accent)',
	danger: 'var(--color-danger)',
};

export const safelist = [
	...Object.values(MDI_ICONS),
	// plus any base utility we always want
	'icon',
	'btn-primary',
	'btn-ghost',
	'btn-lg',
	'text-link',
];

export const shortcuts = {
	// ---- layout primitives ----
	page: 'p-0 m-0',
	container: 'max-w-5xl mx-auto px-6',
	section: 'py-14 md:py-20',
	stack: 'flex flex-col gap-6',
	cluster: 'flex flex-wrap items-center gap-3',

	// ---- typography ----
	eyebrow: 'text-xs tracking-widest uppercase text-muted',
	hero: 'text-4xl md:text-6xl tracking-tight leading-[1.05]',
	lede: 'text-lg md:text-2xl text-muted leading-relaxed',
	muted: 'text-muted',
	'text-link': 'underline underline-offset-4',

	// ---- focus / accessibility ----
	'focus-ring':
		'outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',

	// ---- cards ----
	card: 'bg-surface/30 rounded-2xl p-6 md:p-7 border border-border border-solid border-1',
	'card-hover': 'transition hover:bg-surface/50 hover:border-border-full/30 hover:-translate-y-0.5',
	'card-title': 'text-xl font-semibold tracking-tight',
	'card-body': 'text-muted leading-relaxed',
	'card-cta':
		'text-accent font-medium inline-flex items-center gap-2 group-hover:underline underline-offset-4 transition hover:text-white',

	// ---- buttons ----
	btn: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold transition focus-ring disabled:opacity-50 disabled:pointer-events-none active:translate-x-[1px] active:translate-y-[1px]',
	'btn-ghost': 'btn bg-white/3 border border-border hover:bg-white/8 text-text',
	'btn-primary': 'btn bg-accent text-black hover:brightness-110',
	'btn-lg': 'btn text-lg',

	// ---- icons ----
	icon: 'inline-block align-middle',

	// ---- forms ----
	input: 'border-border rounded-md border-solid border-2 font-inherit bg-#ffffff08 w-full text-base p-1rem',
};
