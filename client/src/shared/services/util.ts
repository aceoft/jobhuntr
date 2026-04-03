type DateFormat = 'short' | 'medium' | 'long' | 'full';

export function formatDateWith(date: Date, format: DateFormat): string {
	date = new Date(date); // ensure it's a date object
	switch (format) {
		case 'short':
			return date.toLocaleDateString();
		case 'medium':
			return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
		case 'long':
			return date.toLocaleDateString(undefined, {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
		case 'full':
			return date.toLocaleDateString(undefined, {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
		default:
			throw new Error(`Unhandled format: ${format}`);
	}
}

export function formatDate(date: Date): string {
	return formatDateWith(date, 'long');
}
