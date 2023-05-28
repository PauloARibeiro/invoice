<script lang="ts">
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';

	import { draggable } from '@neodrag/svelte';

	import DismissCircle from '../Icons/filled/DismissCircle.svelte';

	import type { Toast } from '$lib/stores/toaster';
	import type { DragEventData } from '@neodrag/svelte';

	let dragPosition = tweened({ x: 0, y: 0 }, { easing: expoOut, duration: 1200 });

	export let toast: Toast;
	export let onCloseToast: (id: string, wasSwiped: boolean) => void;

	const valueDragToRemove = browser && window.matchMedia('(max-width: 600px)').matches ? 150 : 200;

	function onDrag({ offsetX, offsetY }: DragEventData) {
		if (offsetX < 0) {
			offsetX = 0;
		}

		dragPosition.set({ x: offsetX, y: offsetY }, { duration: 0 });
	}

	function onDragEnd({ offsetX }: DragEventData) {
		if (offsetX > valueDragToRemove) {
			return onCloseToast(toast.id, true);
		}

		$dragPosition = { x: 0, y: 0 };
	}

	function onCloseClick() {
		onCloseToast(toast.id, false);
	}
</script>

<button
	class="toast"
	use:draggable={{
		axis: 'x',
		bounds: { right: -400, left: 0 },
		position: $dragPosition,
		onDrag: onDrag,
		onDragEnd: onDragEnd
	}}
>
	<button class="close" on:click={onCloseClick}>
		<DismissCircle size="20" />
	</button>
	<svelte:component this={toast.icon} />
	<span class="toast-message">{@html toast.message}</span>
</button>

<style lang="scss">
	:global(.toast-message) {
		color: var(--c-black);
		font-size: 1.4rem;
		text-align: left;
		width: 100%;

		* {
			font-size: 1rem !important;
		}
	}

	.toast {
		position: relative;
		width: 100%;
		background-color: rgba(var(--c-white-rgb), 0.8);
		backdrop-filter: var(--overlay-blur);
		-webkit-backdrop-filter: var(--overlay-blur);
		padding: 1.4rem 2rem;
		border-radius: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.2rem;
		box-shadow: rgba(var(--c-black-rgb), 0.2) 0px 7px 29px 0px;
		transition: background-color 0.12s ease-in-out;
		cursor: auto;
		touch-action: none;

		.close {
			border: none;
			position: absolute;
			left: -1.2rem;
			top: -0.8rem;
			background-color: transparent;
			cursor: pointer;
			opacity: 0;
			transition: all 0.12s ease-in;
			scale: 1;
		}

		&:hover {
			background-color: rgba(var(--c-white-rgb), 1);
			backdrop-filter: 0;
			-webkit-backdrop-filter: 0;

			.close {
				opacity: 1;
			}
		}
	}

	@media only screen and (max-width: 600px) {
		.toast {
			width: calc(100% - 4rem);
		}
	}
</style>
