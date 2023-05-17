<script>
	import 'cropperjs/dist/cropper.css';
	import { Modals, closeModal } from 'svelte-modals';
</script>

<div style="padding: 2rem;">
	<slot />
</div>
<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<style lang="scss" global>
	@import '$lib/scss/app.scss';

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
