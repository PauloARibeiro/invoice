import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import ClientSchema from '$lib/schemas/client';
import avatarGenerator from '$lib/services/avatarGenerator';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	const clientForm = await superValidate(ClientSchema);

	return { clientForm };
};

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const clientForm = await superValidate(formData, ClientSchema);

		if (!clientForm.valid) {
			return fail(400, { clientForm });
		}

		const file = formData.get('photo');

		if (file instanceof File) {
			// Do something with the file.

			if (file.size === 0) {
				const avatar = avatarGenerator(`${clientForm.data.firstName} ${clientForm.data.lastName}`);

				console.log(avatar);
			}
		}

		await delay(3000);
		// TODO: Do something with the validated data

		return { clientForm };
	}
};
