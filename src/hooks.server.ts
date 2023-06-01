import authenticateUser from '$lib/server/Auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const user = await authenticateUser(event);

	if (user) {
		event.locals.user = user.user;
	}

	return resolve(event);
};
