<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'submit';
	export let style: 'primary' | 'cancel' | 'error' | 'warning' = 'primary';
	export let fullWidth: boolean = false;
	export let disabled: boolean = false;
	export let onClick: (event: MouseEvent) => void = () => {};

	export let icon: ConstructorOfATypedSvelteComponent | undefined = undefined;

	function getWidth() {
		return fullWidth ? 'width: 100%;' : '';
	}

	const inlineStyle = `${getWidth()}`;
</script>

<button style={inlineStyle} {type} {disabled} on:click={onClick} class={style}>
	<svelte:component this={icon} size="18" color="var(--c-white)" />
	<span>
		<slot />
	</span>
</button>

<style lang="scss" scoped>
	@mixin style($bg, $color) {
		background: var($bg);
		color: var($color);

		span {
			color: var($color);
		}
	}

	button {
		border: none;
		padding: 0.6rem 3rem;
		border-radius: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: opacity 0.14s ease-in-out;
		cursor: pointer;

		span {
			font-weight: 500;
		}
	}

	.primary {
		@include style(--c-blue, --c-white);
	}

	.error {
		@include style(--c-red, --c-white);
	}

	.cancel {
		@include style(--c-gray-4, --c-black);
	}

	.warning {
		@include style(--c-yellow, --c-black);
	}

	:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
