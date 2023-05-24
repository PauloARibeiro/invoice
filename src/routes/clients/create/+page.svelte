<script lang="ts">
	import type { PageData } from './$types';
	import CreateClientForm from './CreateClientForm.svelte';

	import Toaster from '$lib/stores/toaster';
	import Alert from '$lib/stores/alert';
	import CancelIcon from '$lib/components/Icons/CancelIcon.svelte';

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

<button
	on:click={() =>
		Toaster.notify(
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo magnam ea cum enim, quam ullam eos a minus aliquam iusto quae culpa sunt debitis dolores?',
			CancelIcon
		)}>open toaster</button
>

<button on:click={() => Toaster.notify('Client foi criado', CancelIcon)}>open toaster</button>

<button
	on:click={() =>
		Alert.set({
			isOpen: true,
			message: 'everything will be alright',
			title: 'title'
		})}>test alert</button
>

<CreateClientForm data={data.clientForm} {options} />
