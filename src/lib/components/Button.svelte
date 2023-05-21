<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'submit';
	export let style: 'primary' | 'cancel' | 'error' = 'primary';
	export let onClick: (event: MouseEvent) => void = () => {};

	export let icon: ConstructorOfATypedSvelteComponent | undefined = undefined;
</script>

<button {type} on:click={onClick} class={style}>
	<svelte:component this={icon} size="20" strokeWidth={1.4} />
	<slot />
</button>

<style scoped>
	button {
		border: none;
		font-weight: 500;
		padding: 0.6rem 3rem;
		border-radius: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.primary {
		background: var(--c-blue);
		color: var(--c-white);
	}

	.error {
		background: var(--c-red);
		color: var(--c-white);
	}

	.cancel {
		background: var(--c-gray-4);
		color: var(--c-black);
	}
</style>
