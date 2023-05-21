<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { closeModal } from 'svelte-modals';

	import Cropper from 'cropperjs';
	import type CropperType from 'cropperjs';

	// provided by Modals
	export let isOpen: boolean;
	export let imageSrc: string;
	export let onConfirm: (canvas: HTMLCanvasElement | undefined) => void;

	let cropper: CropperType | null = null;
	let imageEle: HTMLImageElement | null = null;

	onMount(() => {
		if (!imageEle) return;

		if (cropper !== null) {
			cropper.destroy();
		}

		imageEle.src = imageSrc;

		cropper = new Cropper(imageEle, {
			viewMode: 1,
			dragMode: 'move',
			aspectRatio: 9 / 9,
			autoCropArea: 0.4,
			restore: false,
			guides: false,
			center: false,
			highlight: false,
			cropBoxMovable: false,
			cropBoxResizable: false,
			toggleDragModeOnDblclick: false
			// TODO save coordinate on database ??
			// crop: function (event) {
			// 	console.log(event.detail.x);
			// 	console.log(event.detail.y);
			// 	console.log(event.detail.width);
			// 	console.log(event.detail.height);
			// }
		});
	});

	// onDestroy(() => {
	// 	if (cropper) {
	// 		cropper.destroy();
	// 	}

	// 	if (imageEle) {
	// 		imageEle.src = '';
	// 	}
	// });

	function onClose() {
		onConfirm(cropper?.getCroppedCanvas());
		closeModal();
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<img alt="user" bind:this={imageEle} />
			<div class="actions">
				<button on:click={onClose}>OK</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contents {
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: flex-end;
	}
</style>
