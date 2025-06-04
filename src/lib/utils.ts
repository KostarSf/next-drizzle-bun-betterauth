export async function withError<T, E extends Error>(
	cb: () => T | Promise<T>,
	error?: { new (): E }
) {
	try {
		return [await cb(), undefined] as const;
	} catch (err: unknown) {
		if (err instanceof (error ?? Error)) {
			return [undefined, err as E] as const;
		}

		throw err;
	}
}
