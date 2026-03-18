export const MDI_ICONS = {
	music: 'i-mdi-music',
	'trophy-variant': 'i-mdi-trophy-variant',
	codepen: 'i-mdi-codepen',
	'arrow-right': 'i-mdi-arrow-right',
	'chevron-right': 'i-mdi-chevron-right',
	'check-circle': 'i-mdi-check-circle',
	document: 'i-mdi-file-document',
	mail: 'i-mdi-contact-mail',
	apple: 'i-mdi-apple',
	amazon: 'i-mdi-amazon',
	spotify: 'i-mdi-spotify',
	linkedin: 'i-mdi-linkedin',
} as const;

export type MdiIconName = keyof typeof MDI_ICONS;
