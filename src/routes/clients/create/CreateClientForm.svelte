<script lang="ts">
	import type { Validation } from 'sveltekit-superforms';
	import type { ClientSchemaType } from '$lib/schemas/client';
	import { superForm } from 'sveltekit-superforms/client';

	import ClientSchema from '$lib/schemas/client';

	import PhotoUpload from '$lib/components/FormField/PhotoUpload.svelte';
	import Input from '$lib/components/FormField/Input.svelte';
	import Select from '$lib/components/FormField/Select.svelte';
	import Button from '$lib/components/Button.svelte';

	import { XCircleIcon } from 'svelte-feather-icons';
	import { setLoaderState } from '$lib/components/Loader/loader';

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: Validation<ClientSchemaType>;
	export let options: any[] = [];

	const { form, errors, delayed, enhance, submitting, capture } = superForm(data, {
		validators: ClientSchema
	});

	delayed.subscribe((state) => {
		setLoaderState(state, `Creating new client <b>"${$form.firstName}"</b>`);
	});

	// submitting.subscribe((state) => (isSubmitting = state));
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<PhotoUpload id="photo" label="Photo" value={$form.photo} />

	<Input
		type="text"
		label="First Name"
		id="firstName"
		errors={$errors.firstName}
		bind:value={$form.firstName}
	/>

	<Input type="text" label="First Name" disabled value="brrrroooo" />

	<Input type="text" label="Email" id="email" errors={$errors.email} bind:value={$form.email} />

	<Input
		type="tel"
		label="Phone"
		fixedLabel="+41"
		id="phone"
		errors={$errors.phone}
		bind:value={$form.phone}
	/>

	<Select
		label="Last Name"
		id="lastName"
		{options}
		errors={$errors.lastName}
		bind:value={$form.lastName}
	/>

	<div style="display: flex; margin-top: 2rem; gap: 1rem">
		<!-- <Button type="reset" style="cancel">Cancel</Button>
		<Button type="reset" style="error">Cancel</Button> -->
		<Button icon={XCircleIcon}>Create User</Button>
	</div>
</form>
