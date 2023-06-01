<script lang="ts">
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';

	import { draggable } from '@neodrag/svelte';
	import { swipe } from 'svelte-gestures';

	import Direction from '$lib/enums/Direction';

	import DismissCircle from '../Icons/filled/DismissCircle.svelte';

	import type { Toast } from '$lib/stores/Toaster';
	import type { DragEventData } from '@neodrag/svelte';
	import type { OnToastCloseProps } from '$lib/types/OnToastCloseProps';

	export let toast: Toast;
	export let onCloseToast: (onCloseProps: OnToastCloseProps) => void;

	const VALUE_DRAG_TO_REMOVE =
		browser && window.matchMedia('(max-width: 600px)').matches ? 150 : 220;

	const LEFT_DRAG_OFFSET_MAX = -30;

	const IS_TOUCH_DEVICE = 'ontouchstart' in window;

	let dragPosition = tweened({ x: 0, y: 0 }, { easing: expoOut, duration: 1200 });

	function onSwipe(
		event: CustomEvent<{
			direction: 'left' | 'top' | 'right' | 'bottom';
			target: EventTarget;
		}>
	) {
		if (!IS_TOUCH_DEVICE) {
			return;
		}

		return triggerClose(true, event.detail.direction as Direction);
	}

	function onDrag({ offsetX, offsetY }: DragEventData) {
		if (offsetX < LEFT_DRAG_OFFSET_MAX) {
			offsetX = LEFT_DRAG_OFFSET_MAX;
		}

		dragPosition.set({ x: offsetX, y: offsetY }, { duration: 0 });
	}

	function onDragEnd({ offsetX }: DragEventData) {
		if (IS_TOUCH_DEVICE) {
			$dragPosition = { x: 0, y: 0 };
			return;
		}

		if (offsetX > VALUE_DRAG_TO_REMOVE) {
			return triggerClose(false, Direction.RIGHT);
		}

		if (offsetX <= LEFT_DRAG_OFFSET_MAX) {
			return triggerClose(false, Direction.LEFT);
		}

		$dragPosition = { x: 0, y: 0 };
	}

	function triggerClose(wasSwiped: boolean, direction: Direction) {
		const key = wasSwiped ? 'swiped' : 'dragged';

		return onCloseToast({
			id: toast.id,
			[key]: { direction }
		});
	}

	function onCloseClick() {
		onCloseToast({ id: toast.id });
	}
</script>

<button
	class="toast"
	on:swipe={onSwipe}
	use:swipe={{ timeframe: 500, minSwipeDistance: 100 }}
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
