<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'submit';
	export let style: 'primary' | 'cancel' = 'primary';
	export let onClick: (event: MouseEvent) => void = () => {};
</script>

<button {type} on:click={onClick} class={style}>
	<slot />
</button>

<style>
	button {
		border: none;
		font-weight: 500;
		padding: 0.7rem 3rem;
		border-radius: 1.2rem;
	}

	.primary {
		background: var(--c-blue);
		color: var(--c-white);
	}

	.cancel {
		background: var(--c-gray-4);
		color: var(--c-black);
	}
</style>
