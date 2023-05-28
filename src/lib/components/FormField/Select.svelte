<script lang="ts">
	export let id = '';
	export let label = '';
	export let options: any[] = [];
	export let optionValueProp: string = 'value';
	export let optionLabelProp: string = 'label';
	export let errors: string[] | undefined = undefined;
	export let value = '';

	import ChevronUpDown from '../Icons/filled/ChevronUpDown.svelte';

	import Error from './_Error.svelte';
	import Label from './_Label.svelte';
	import Wrapper from './_Wrapper.svelte';
</script>

<Wrapper>
	<Label {id} {label} />
	<div class="select-wrapper">
		<select class="form-field" class:errors name={id} {id} bind:value>
			{#each options as option}
				<option value={option[optionValueProp]}>{option[optionLabelProp]}</option>
			{/each}
		</select>
		<div class="icons">
			<ChevronUpDown size="18" />
		</div>
	</div>
	<Error {errors} />
</Wrapper>

<style lang="scss" scoped>
	@import './style.scss';

	.form-field {
		appearance: none;
	}

	.select-wrapper {
		width: 100%;
		position: relative;
	}

	.icons {
		position: absolute;
		right: 0.9rem;
		bottom: 0;
		height: 100%;
		background-color: transparent;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		cursor: pointer;
		pointer-events: none;
	}
</style>
