<script lang="ts">
	import { browser } from '$app/environment';

	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	import Toaster from '../stores/toaster';

	import { XCircleIcon } from 'svelte-feather-icons';

	import Button from './Button.svelte';

	const mobileSize = browser ? window.matchMedia('(max-width: 600px)') : null;
	let desktopDuration = 450;
	let desktopDelay = 210;

	// prevent weird gitch that makes toast stop mid animation
	let isToastClosing = false;

	function onCloseToast(id: string) {
		isToastClosing = true;

		Toaster.remove(id);

		setTimeout(() => {
			isToastClosing = false;
		}, 540);
	}
</script>

<div
	class="toaster"
	on:mouseenter={() => Toaster.removeTimerFromAll()}
	on:mouseleave={() => Toaster.addTimerToAll()}
	style={`pointer-events: ${isToastClosing ? 'none' : 'auto'};`}
>
	<div class="clear-all" class:moreThanOne={$Toaster.toasts.size < 2}>
		{#if $Toaster.toasts.size > 1}
			<div in:fade out:fly={{ y: -66, duration: 350 }}>
				<Button onClick={Toaster.clearAll} style="cancel" fullWidth>Clear All</Button>
			</div>
		{/if}
	</div>

	<!-- <div> -->
	{#if mobileSize && mobileSize.matches && typeof $Toaster.oldestToast !== 'undefined'}
		<!-- TODO make this animate based off item height -->
		<button
			class="toast"
			on:click={() => $Toaster.oldestToast && Toaster.remove($Toaster.oldestToast.id)}
			in:fly={{ y: -120, duration: 400 }}
			out:fly={{ y: -120, duration: 400 }}
		>
			<svelte:component this={$Toaster.oldestToast.icon} />
			<span>{@html $Toaster.oldestToast.message}</span>
		</button>
	{:else}
		{#each Array.from($Toaster.toasts) as [id, toast] (id)}
			<button
				class="toast"
				animate:flip={{ duration: desktopDuration, delay: desktopDelay }}
				in:fly={{ x: 400, duration: desktopDuration }}
				out:fly={{ x: 400, duration: desktopDuration }}
			>
				<!-- <button class="close" on:click={() => onCloseToast(id)}>
					<XCircleIcon size="20" />
				</button> -->
				<svelte:component this={toast.icon} />
				<span>{@html toast.message}</span>
			</button>
		{/each}
	{/if}
</div>

<!-- </div> -->

<style lang="scss">
	.toaster {
		width: 40rem;
		gap: 2rem;
		display: flex;
		flex-direction: column;
		position: fixed;
		right: 0;
		top: 0;
		background-color: transparent;
		padding: 1.6rem 1.6rem;
		border-radius: 1.2rem;
		border: 0.1rem solid transparent;
	}

	.clear-all {
		&.moreThanOne {
			height: 3.6rem;
		}
	}

	.toast {
		position: relative;
		width: 100%;
		background-color: rgba(var(--c-white-rgb), 0.7);
		backdrop-filter: var(--overlay-blur);
		padding: 1.4rem 2rem;
		border-radius: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.2rem;
		box-shadow: rgba(var(--c-black-rgb), 0.2) 0px 7px 29px 0px;
		cursor: auto;

		span {
			color: var(--c-black);
			font-size: 1.4rem;
			text-align: left;
			width: 100%;

			b {
				font-size: 1.4rem;
			}
		}

		.close {
			border: none;
			position: absolute;
			left: -1rem;
			top: -0.5rem;
			background-color: transparent;
			cursor: pointer;
			opacity: 1;
			transition: all 0.12s ease-in;
			scale: 1;
		}
	}

	@media only screen and (max-width: 600px) {
		.toaster {
			right: unset;
			width: 100%;
			align-items: center;
			gap: 1.6rem;

			.toast {
				width: calc(100% - 4rem);
			}
		}
	}
</style>
