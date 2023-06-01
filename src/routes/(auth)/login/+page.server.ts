import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { compareSync } from 'bcryptjs';
import UserDB from '$lib/db/User';
import CookieService from '$lib/services/Cookie';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username || !password) {
			return fail(400, { message: 'All fields are required' });
		}

		const user = await UserDB.findByUsername(username);

		if (!compareSync(password, user?.password)) {
			return fail(400, { password, incorrect: true });
		}

		if (user) {
			CookieService.storeAuthenticationCookies(cookies, user.id);
		}

		throw redirect(302, '/clients');
	}
};
