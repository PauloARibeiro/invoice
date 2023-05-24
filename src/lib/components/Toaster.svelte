<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { flip } from 'svelte/animate';
	import { fade, slide, fly, scale } from 'svelte/transition';

	import DeviceDetector from 'device-detector-js';

	import Toaster from '../stores/toaster';

	import Item from './Item.svelte';

	let isDesktop = true;
	let flyX = 380;
	let duration = 350;

	onMount(() => {
		if (browser) {
			const deviceDetector = new DeviceDetector();

			const device = deviceDetector.parse(navigator.userAgent);

			isDesktop = device.device?.type === 'desktop';

			if (!isDesktop) {
				flyX = 0;
				duration = 300;
			}
		}
	});
</script>

<!-- {#if $Toaster.isOpen} -->

<div class="toaster">
	{#if isDesktop}
		{#each $Toaster.toasts as toast (toast.id)}
			<!-- <div class="toast" transition:fly={{ x: flyX, duration }}>
				<svelte:component this={toast.icon} />
				<span>{toast.message}</span>
			</div> -->
			<Item>
				<svelte:component this={toast.icon} />
				<span>{toast.message}</span>
			</Item>
		{/each}
	{:else}
		{#each $Toaster.toasts as toast (toast.id)}
			<div class="toast" animate:flip transition:scale>
				<svelte:component this={toast.icon} />
				<span>{toast.message}</span>
			</div>
		{/each}
	{/if}
</div>

<!-- {/if} -->

<style scoped lang="scss">
	.toaster {
		gap: 2rem;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
		position: fixed;
		right: 1.6rem;
		top: 1.6rem;
		// margin-left: 1.6rem;
	}

	.toast {
		width: 30rem;
		background-color: rgba(var(--c-white-rgb), 0.9);
		backdrop-filter: var(--overlay-blur);
		padding: 1.4rem 2rem;
		border-radius: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.4rem;
		box-shadow: rgba(var(--c-black-rgb), 0.2) 0px 7px 29px 0px;

		span {
			color: var(--c-black);
			font-size: 1.4rem;
			text-align: left;
			width: 100%;
		}
	}

	@media only screen and (max-width: 600px) {
		.toaster {
			bottom: 1.6rem;
			right: unset;
			top: unset;
			width: 100%;
			align-items: center;
			gap: 1.6rem;

			.toast {
				width: calc(100% - 4rem);
			}
		}
	}
</style>
