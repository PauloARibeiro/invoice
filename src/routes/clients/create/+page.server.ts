import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import ClientSchema from '$lib/schemas/client';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	const form = await superValidate(ClientSchema());

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, ClientSchema());

		if (!form.valid) {
			return fail(400, { form });
		}

		const file = formData.get('photo');

		if (file instanceof File) {
			// Do something with the file.
			console.log(file);
		}

		// TODO: Do something with the validated data

		return { form };
	}
};
