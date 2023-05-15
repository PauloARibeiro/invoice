<script lang="ts">
	export let id = '';
	export let label = '';
	export let options: any[] = [];
	export let optionValueProp: string = 'value';
	export let optionLabelProp: string = 'label';
	export let errors: string[] | undefined = undefined;
	export let value = '';

	import { ChevronDownIcon, ChevronUpIcon } from 'svelte-feather-icons';

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
			<div class="icon">
				<ChevronUpIcon size="18" strokeWidth={1.4} />
			</div>
			<div class="icon">
				<ChevronDownIcon class="icon" size="18" strokeWidth={1.4} />
			</div>
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
		right: 0;
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

		.icon {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			right: 0.9rem;

			&:nth-child(1) {
				top: 0.3rem;
			}

			&:nth-child(2) {
				bottom: 0.3rem;
			}
		}
	}
</style>
