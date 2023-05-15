<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ClientSchema from '$lib/schemas/client';
	import Input from '$lib/components/FormField/Input.svelte';
	import Select from '$lib/components/FormField/Select.svelte';
	import Button from '$lib/components/Button.svelte';
	import PhotoUpload from '$lib/components/FormField/PhotoUpload.svelte';

	import { XCircleIcon } from 'svelte-feather-icons';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		validators: ClientSchema()
	});

	const options = [
		{
			value: 'dude',
			label: 1
		},
		{
			value: '2',
			label: 2
		}
	];

	$: {
		console.log(form);
		console.log($form.photo);
	}
</script>

<SuperDebug data={$form} />

<form
	use:enhance
	method="POST"
	style="padding-top: 20px; display: flex; flex-direction: column; gap: 1rem"
>
	<PhotoUpload id="photo" label="Photo" bind:value={$form.photo} />

	<Input
		type="text"
		label="First Name"
		id="firstName"
		errors={$errors.firstName}
		bind:value={$form.firstName}
	/>

	<Input type="email" label="Email" id="email" errors={$errors.email} bind:value={$form.email} />

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
		<Button type="reset" style="cancel">Cancel</Button>
		<Button icon={XCircleIcon}>Create User</Button>
	</div>
</form>
