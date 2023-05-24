<script>
	import { Modals, closeModal } from 'svelte-modals';
	import Loader from '$lib/components/Loader.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
</script>

<div style="padding: 2rem;">
	<slot />
</div>
<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<Loader />
<Alert />
<Toaster />

<style lang="scss" global>
	@import '$lib/scss/app.scss';

	// .backdrop {
	// 	position: fixed;
	// 	top: 0;
	// 	bottom: 0;
	// 	right: 0;
	// 	left: 0;
	// 	background: rgba(0, 0, 0, 0.5);
	// }
</style>
