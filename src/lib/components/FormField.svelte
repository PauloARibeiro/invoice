<script lang="ts">
	export let id = '';
	export let label = '';
	export let placeholder = '';
	export let errors: string[] | undefined = undefined;
	export let value = '';
	export let type: 'text' | 'email' | 'tel' = 'text';

	import { browser } from '$app/environment';
	import { scale } from 'svelte/transition';
	import { XCircleIcon } from 'svelte-feather-icons';

	let isFocused = false;

	// let inputElement: HTMLElement;

	// // if (browser) {
	// $: isFocused = typeof document !== 'undefined' && document.activeElement === inputElement;
	// // }

	function toggleIsFocused(toggle: boolean) {
		isFocused = toggle;
	}

	function resetValue() {
		value = '';
	}
</script>

<p>Input is {isFocused ? 'focused' : 'not focused'}</p>

<div class="form-field">
	<label for={id}>
		{label}:
	</label>
	<div class="input-wrapper">
		{#if type === 'text'}
			<input
				on:focus={() => toggleIsFocused(true)}
				on:blur={() => toggleIsFocused(false)}
				autocomplete="off"
				type="text"
				{id}
				{placeholder}
				name={id}
				bind:value
			/>
		{:else if type === 'email'}
			<input autocomplete="off" type="email" {id} {placeholder} name={id} bind:value />
		{:else if type === 'tel'}
			<input autocomplete="off" type="tel" {id} {placeholder} name={id} bind:value />
		{/if}
		{#if value.length > 0 && isFocused}
			<button on:click={resetValue} transition:scale={{ duration: 200, start: 0 }}>
				<XCircleIcon size="20" strokeWidth={1.4} />
			</button>
		{/if}
	</div>
	{#if errors}
		{#each errors as error}
			<small>{error}</small>
		{/each}
	{/if}
</div>

<style lang="scss" scoped>
	.form-field {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		position: relative;
		gap: 0.6rem;
	}

	label {
		font-weight: 400;
		font-size: 1.7rem;
	}

	.input-wrapper {
		position: relative;

		input {
			background-color: var(--white);
			padding: 0.6rem 3.3rem 0.6rem 1.2rem;
			border-radius: 1.2rem;
			border: 0.1rem solid var(--c-gray-4);
			box-shadow: 0 0 0 1rem rgba(var(--c-blue-rgb), 0);
			transition: border 0.2s ease-in, box-shadow 0s;

			&:focus {
				border-color: var(--c-blue);
				box-shadow: 0 0 0 0.3rem rgba(var(--c-teal-rgb), 0.2);
				transition: box-shadow 0.2s ease-in;
			}
		}

		button {
			position: absolute;
			right: 0.5rem;
			bottom: 0;
			height: 100%;
			background-color: transparent;
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}
	}

	small {
		color: var(--c-red);
		font-size: 1.2rem;
	}
</style>
