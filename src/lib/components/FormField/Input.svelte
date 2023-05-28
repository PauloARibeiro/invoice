<script lang="ts">
	export let id = '';
	export let label = '';
	export let placeholder = '';
	export let errors: string[] | undefined = undefined;
	export let value = '';
	export let type: 'text' | 'email' | 'tel' = 'text';
	export let fixedLabel: undefined | string = undefined;
	export let disabled = false;

	import { scale } from 'svelte/transition';

	import Error from './_Error.svelte';
	import Label from './_Label.svelte';
	import Wrapper from './_Wrapper.svelte';
	import DismissCircle from '../Icons/filled/DismissCircle.svelte';

	let isFocused = false;

	function toggleIsFocused(toggle: boolean) {
		isFocused = toggle;
	}

	function resetValue() {
		value = '';
	}

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<Wrapper>
	<Label {id} {label} />
	<div class="input-wrapper">
		{#if fixedLabel}
			<div class="fixed-label">
				<span>{fixedLabel}</span>
			</div>
		{/if}

		<slot name="icon" />

		<input
			class="form-field"
			class:errors
			class:fixedLabel
			autocomplete="off"
			{id}
			{placeholder}
			{disabled}
			name={id}
			use:typeAction
			bind:value
			on:focus={() => toggleIsFocused(true)}
			on:blur={() => toggleIsFocused(false)}
		/>

		{#if value.length > 0 && isFocused}
			<button
				type="button"
				tabindex="-1"
				on:click={resetValue}
				transition:scale={{ duration: 200, start: 0 }}
			>
				<!-- <XCircleIcon size="20" strokeWidth={1.4} /> -->
				<DismissCircle size="20" />
			</button>
		{/if}
	</div>
	<Error {errors} />
</Wrapper>

<style lang="scss" scoped>
	@import './style.scss';

	$border-radius: 1.2rem;

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;

		.fixed-label {
			background-color: var(--c-gray-5);
			height: 100%;
			padding: 0.6rem 1.4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: $border-radius 0 0 $border-radius;

			span {
				color: var(--c-gray-1);
				font-weight: 500;
			}
		}

		.form-field {
			&.fixedLabel {
				border-radius: 0 $border-radius $border-radius 0;
			}
		}

		:disabled {
			background-color: var(--c-gray-5);
			color: var(--c-gray-1);
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
</style>
