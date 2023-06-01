<script lang="ts">
	import { onMount } from 'svelte';
	import { closeModal } from 'svelte-modals';
	// import { getCroppedImg } from './cropper';

	// import Cropper from 'cropperjs';
	// import Cropper from 'svelte-easy-crop';
	import Loader from '../../stores/Loader';
	// import type CropperType from 'cropperjs';

	// provided by Modals
	export let isOpen: boolean;
	export let imageSrc: string;
	// export let onConfirm: (canvas: any | undefined) => void;

	// let cropper: CropperType | null = null;
	// let cropper: CropperType | null = null;
	let imageEle: HTMLImageElement | null = null;

	// let pixelCrop: any;

	onMount(() => {
		if (!imageEle) return;

		// if (cropper !== null) {
		// 	cropper.destroy();
		// }

		imageEle.src = imageSrc;

		// cropper = new Cropper(imageEle, {
		// 	viewMode: 1,
		// 	dragMode: 'move',
		// 	aspectRatio: 9 / 9,
		// 	autoCropArea: 0.4,
		// 	restore: false,
		// 	guides: false,
		// 	center: false,
		// 	highlight: false,
		// 	cropBoxMovable: false,
		// 	cropBoxResizable: false,
		// 	toggleDragModeOnDblclick: false
		// 	// TODO save coordinate on database ??
		// 	// crop: function (event) {
		// 	// 	console.log(event.detail.x);
		// 	// 	console.log(event.detail.y);
		// 	// 	console.log(event.detail.width);
		// 	// 	console.log(event.detail.height);
		// 	// }
		// });
	});

	// onDestroy(() => {
	// 	if (cropper) {
	// 		cropper.destroy();
	// 	}

	// 	if (imageEle) {
	// 		imageEle.src = '';
	// 	}
	// });

	async function onClose() {
		// onConfirm(cropper?.getCroppedCanvas());

		closeModal();

		Loader.set(true, 'Cropping...');

		// const croppedImg = await getCroppedImg(imageSrc, pixelCrop);

		// onConfirm(croppedImg);

		Loader.reset();
	}

	// function previewCrop(e: any) {
	// 	pixelCrop = e.detail.pixels;
	// }
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<!-- <Cropper
				aspect={1}
				image={imageSrc}
				restrictPosition={true}
				maxZoom={10}
				on:cropcomplete={previewCrop}
			/> -->
			<!-- <img alt="user" bind:this={imageEle} />
			<div class="actions">
				<button on:click={onClose}>OK</button>
			</div> -->

			<div class="actions">
				<button on:click={onClose}>OK</button>
			</div>
		</div>
	</div>
{/if}

<!-- <style>
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
		width: 100%;
		height: 100%;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
		position: relative;
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
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style> -->
