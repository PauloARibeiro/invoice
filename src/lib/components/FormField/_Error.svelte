<script lang="ts">
	export let errors: string[] | undefined = undefined;

	import ErrorCircle from '../Icons/filled/ErrorCircle.svelte';
</script>

<div>
	{#if errors}
		{#each errors as error}
			<small>
				<ErrorCircle size="14" color="var(--c-red)" />
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
