import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcryptjs';
import UserDB from '$lib/db/user';
import CookieService from '$lib/services/cookie';

// export const load: PageServerLoad = async ({ locals }) => {
// 	const session = await locals.validate();

// 	if (session) {
// 		throw redirect(302, '/');
// 	}
// };

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			const data = await request.formData();

			const username = data.get('username') as string;
			const email = data.get('email') as string;
			const password = data.get('password') as string;

			if (!username || !email || !password) {
				return fail(400, { message: 'All fields are required' });
			}

			const passwordHash = hashSync(password, 14);

			const user = await UserDB.createUser({
				password: passwordHash,
				email,
				username
			});

			const tokens = CookieService.storeAuthenticationCookies(cookies, user.id);

			await UserDB.storeRefreshToken(user.id, tokens.refreshToken);

			return {
				user
			};
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Could not register user' });
		}
	}
};
