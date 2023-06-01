<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, scale } from 'svelte/transition';

	// import Toaster from '../../stores/Toaster';
	import Toaster from '$lib/stores/Toaster';
	import Toast from './_Toast.svelte';

	// import Button from '../Button.svelte';

	import type { OnToastCloseProps } from '$lib/types/OnToastCloseProps';
	import Direction from '$lib/enums/Direction';

	// prevent weird gitch that makes toast stop mid animation
	let isToastClosing = false;
	let onToastCloseProps: OnToastCloseProps = {
		id: ''
	};

	function tostCloseAnimation(node: Element) {
		const { dragged, swiped } = onToastCloseProps;

		if (dragged?.direction === Direction.RIGHT || swiped?.direction === Direction.RIGHT) {
			return fly(node, { duration: 400, x: 400 });
		}

		if (dragged?.direction === Direction.LEFT || swiped?.direction === Direction.LEFT) {
			return fly(node, { duration: 1200, x: 800 });
		}

		return scale(node, { duration: 400 });
	}

	function onCloseToast(props: OnToastCloseProps) {
		onToastCloseProps = props;

		isToastClosing = true;

		Toaster.remove(props.id);

		setTimeout(resetAfterClose, 540);
	}

	function resetAfterClose() {
		onToastCloseProps.dragged = undefined;
		onToastCloseProps.swiped = undefined;

		isToastClosing = false;
	}
</script>

<div
	on:mouseenter={() => !isToastClosing && Toaster.removeTimerFromAll()}
	on:mouseleave={() => !isToastClosing && Toaster.addTimerToAll()}
	class="toaster"
>
	<!-- <div class="clear-all">
		{#if $Toaster.toasts.size > 1}
			<div in:fade out:fly={{ y: -66, duration: 350 }}>
				<Button onClick={Toaster.clearAll} style="cancel" fullWidth>Clear All</Button>
			</div>
		{/if}
	</div> -->

	<!-- <div> -->
	<!-- {#if mobileSize && mobileSize.matches && typeof $Toaster.oldestToast !== 'undefined'} -->
	<!-- TODO make this animate based off item height -->
	<!-- <button
			class="toast"
			on:click={() => $Toaster.oldestToast && Toaster.remove($Toaster.oldestToast.id)}
			in:fly={{ y: -120, duration: 300 }}
			out:fly={{ y: -120, duration: 400 }}
		>
			<svelte:component this={$Toaster.oldestToast.icon} />
			<span>{@html $Toaster.oldestToast.message}</span>
		</button> -->
	<!-- {:else} -->

	{#each Array.from($Toaster.toasts) as [id, toast] (id)}
		<div
			animate:flip={{ duration: 300, delay: 200 }}
			in:fly={{ x: 400, duration: 300 }}
			out:tostCloseAnimation
		>
			<Toast {toast} {onCloseToast} />
		</div>
	{/each}
	<!-- {/if} -->
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

	// .clear-all {
	// &.moreThanOne {
	// 	height: 3.6rem;
	// }
	// }

	@media only screen and (max-width: 600px) {
		.toaster {
			right: unset;
			width: 100%;
			align-items: center;
			gap: 1.6rem;
		}
	}
</style>
