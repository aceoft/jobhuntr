import { defineConfig } from 'unocss';
import * as uno from './uno';

export default defineConfig({
	theme: {
		colors: {
			...uno.colors,
		},
	},
	presets: [...uno.presets],
	safelist: [...uno.safelist],
	shortcuts: {
		...uno.shortcuts,
	},
});
