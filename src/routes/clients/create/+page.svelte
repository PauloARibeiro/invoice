<script lang="ts">
	import type { PageData } from './$types';
	import CreateClientForm from './CreateClientForm.svelte';

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
