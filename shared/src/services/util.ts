export function optionalString(value: string | null | undefined): string | undefined {
	return value ?? undefined;
}
