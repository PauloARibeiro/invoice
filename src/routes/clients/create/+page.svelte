<script lang="ts">
	import type { PageData } from './$types';
	import CreateClientForm from './CreateClientForm.svelte';

	import Toaster from '$lib/stores/Toaster';
	import Alert from '$lib/stores/Alert';
	import CancelIcon from '$lib/components/Icons/colored/CancelIcon.svelte';

	export let data: PageData;

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
</script>

<CreateClientForm data={data.clientForm} {options} />

<button on:click={() => Toaster.notify('clienet <b>created</b>', CancelIcon)}>open toaster</button>

<button on:click={() => Toaster.notify('Client foi criado', CancelIcon)}>open toaster</button>

<button
	on:click={() =>
		Alert.set({
			isOpen: true,
			message: 'everything will be alright',
			title: 'title'
		})}>test alert</button
>
