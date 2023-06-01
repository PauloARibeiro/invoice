<script>
	import { fade, scale } from 'svelte/transition';
	import Alert from '$lib/stores/Alert';

	import Button from './Button.svelte';

	function closeModal() {
		if ($Alert.onCancel) {
			$Alert.onCancel();
		}

		if ($Alert.closeOnCancel) {
			Alert.reset();
		}
	}

	function onConfirm() {
		if ($Alert.onConfirm) {
			$Alert.onConfirm();
		}

		if ($Alert.closeOnConfirm) {
			console.log('what ?');
			Alert.reset();
		}
	}
</script>

{#if $Alert.isOpen}
	<div class="alert" transition:fade={{ duration: 150 }}>
		<button class="backdrop" on:click={closeModal} />
		<main in:scale={{ duration: 300 }} out:scale={{ duration: 400 }}>
			<!-- <span>icon vai aqui</span> -->
			<!-- <CancelIcon /> -->
			<h5>{$Alert.title}</h5>
			<span>{$Alert.message}</span>
			<footer>
				<!-- <Button fullWidth style="cancel">Close</Button> -->
				<Button fullWidth onClick={onConfirm}>Close</Button>
			</footer>
		</main>
	</div>
{/if}

<style lang="scss" scoped>
	.alert {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 2.4rem;
		backdrop-filter: var(--overlay-blur);
		-webkit-backdrop-filter: var(--overlay-blur);
		background-color: rgba(var(--c-black-rgb), 0.2);
		z-index: 999;
	}

	.backdrop {
		border: none;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}

	main {
		background-color: rgba(var(--c-white-rgb), 1);
		width: 30rem;
		padding: 2rem;
		border-radius: 1.4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: rgba(var(--c-black-rgb), 0.2) 0px 7px 29px 0px;

		h5 {
			align-self: center;
			margin: 0;
			font-size: 2.8rem;
			font-weight: 700;
			text-align: center;
			// margin-top: 2rem;
		}

		span {
			margin-top: 1rem;
			margin-bottom: 2rem;
		}

		footer {
			width: 100%;
			display: flex;
			gap: 1rem;
		}
	}
</style>
