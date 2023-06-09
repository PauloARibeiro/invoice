import { redirect } from '@sveltejs/kit';

export default function authCheck(locals: App.Locals) {
	console.log('Ran Layout Auth Check');

	if (!locals.user) {
		console.log('Access Denied');

		throw redirect(303, '/login');
	}

	return {
		user: locals.user
	};
}
