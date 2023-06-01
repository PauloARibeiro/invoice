import authCheck from '$lib/layouts/Auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return authCheck(event.locals);
};
