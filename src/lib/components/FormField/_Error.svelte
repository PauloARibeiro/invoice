<script lang="ts">
	export let errors: string[] | undefined = undefined;

	import { AlertCircleIcon } from 'svelte-feather-icons';
</script>

<div>
	{#if errors}
		{#each errors as error}
			<small>
				<AlertCircleIcon size="13" strokeWidth={2} />
				{error}
			</small>
		{/each}
	{/if}
</div>

<style lang="scss" scoped>
	small {
		color: var(--c-red);
		font-size: 1.3rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
</style>
