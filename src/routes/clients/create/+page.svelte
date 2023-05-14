<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ClientSchema from '$lib/schemas/client';
	import FormField from '$lib/components/FormField.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		validators: ClientSchema()
	});

	$: {
		console.log(form);
	}
</script>

<!-- <SuperDebug data={$form} /> -->

<form
	use:enhance
	method="POST"
	style="padding-top: 20px; display: flex; flex-direction: column; gap: 1rem"
>
	<!-- <label for="firstName">First Name</label>
	<input type="text" id="firstName" name="firstName" bind:value={$form.firstName} />
	{#if $errors.firstName}
		<small>{$errors.firstName}</small>
	{/if} -->

	<FormField
		type="text"
		label="First Name"
		id="firstName"
		placeholder="your first name"
		errors={$errors.firstName}
		bind:value={$form.firstName}
	/>

	<FormField
		type="text"
		label="Last Name"
		id="lastName"
		errors={$errors.lastName}
		bind:value={$form.lastName}
	/>

	<FormField
		type="email"
		label="Email"
		id="email"
		errors={$errors.email}
		bind:value={$form.email}
	/>

	<FormField type="tel" label="Phone" id="phone" errors={$errors.phone} bind:value={$form.phone} />

	<!-- <label for="photo" style="color: var(--c-red)">Photo</label>
	<input type="file" id="photo" name="photo" accept="image/*" bind:value={$form.photo} />

	<br />
	<br /> -->

	<div style="display: flex; margin-top: 2rem; gap: 1rem">
		<Button type="reset" style="cancel">Cancel</Button>
		<Button>Create User</Button>
	</div>
</form>
