<script lang="ts">
	export let id = '';
	export let label = '';
	export let errors: string[] | undefined = undefined;
	export let value: any = undefined;

	import { openModal } from 'svelte-modals';

	import Error from './_Error.svelte';
	// import Label from './_Label.svelte';
	import Wrapper from './_Wrapper.svelte';

	import ImageUploadModal from '../Modals/ImageUploadModal.svelte';
	// import { UserIcon } from 'svelte-feather-icons';
	import Loader from '../../stores/loader';

	let file: File | null = null;
	let croppedImgSrc: string | undefined;
	let inputRef: HTMLInputElement | undefined;

	function onFileSelected(e: any) {
		if (!e.target.files[0].type.startsWith('image/')) return;

		file = e.target.files[0];

		openEditModal();
	}

	function openEditModal() {
		if (!file) return;

		const reader = new FileReader();

		Loader.set(true, 'Uploading...');

		reader.onload = (e) => {
			if (!file || !e.target) return;

			openModal(ImageUploadModal, {
				imageSrc: e.target.result as string,
				onConfirm
			});

			Loader.reset();
		};

		reader.readAsDataURL(file);
	}

	function onConfirm(canvas: any | undefined) {
		// canvas?.toBlob((blob) => {
		// 	value = blob;
		// });

		croppedImgSrc = canvas;
		// croppedImgSrc = canvas?.toDataURL();
	}

	function triggerFileInput() {
		// inputRef?.click();
	}
</script>

<Wrapper>
	<section>
		<!-- <Label {id} {label} /> -->
		<main>
			<div class="main-wrapper">
				<button type="button" class="placeholder" on:click={triggerFileInput}>
					{#if croppedImgSrc}
						<img src={croppedImgSrc} alt="user" />
					{/if}
				</button>

				<!-- TODO future desktop -->
				<!-- <button class="edit-btn" type="button" on:click={openEditModal}>edit</button> -->
			</div>
		</main>

		<input bind:this={inputRef} hidden type="file" name={id} {id} on:change={onFileSelected} />
	</section>
	<Error {errors} />
</Wrapper>

<style lang="scss" scoped>
	@import './style.scss';

	section {
		width: 100%;
		display: flex;
		justify-content: center;
		position: relative;
	}

	main {
		position: relative;

		.main-wrapper {
			overflow: hidden;
		}

		.placeholder {
			width: 15rem;
			height: 15rem;
			background-color: var(--c-gray-5);
			border-radius: 50%;
			position: relative;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 0;
			padding: 0;
			overflow: hidden;

			img {
				object-fit: fill;
				width: 100%;
				height: 100%;
			}
			// border: 0.2rem solid var(--c-black);

			svg {
				position: absolute;
			}
		}

		// TODO future desktop
		// .edit-btn {
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 50%;
		// 	transform: translateX(-50%);
		// 	border: 0;
		// 	// background-color: ;
		// }
	}
</style>
