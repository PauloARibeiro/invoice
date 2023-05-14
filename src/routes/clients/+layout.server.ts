import authCheck from '$lib/layouts/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return authCheck(event.locals);
};
