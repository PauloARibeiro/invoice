<script lang="ts">
	export let id = '';
	export let label = '';
	export let errors: string[] | undefined = undefined;
	export let value: any = undefined;

	import { openModal } from 'svelte-modals';

	import Error from './_Error.svelte';
	import Label from './_Label.svelte';
	import Wrapper from './_Wrapper.svelte';

	import ImageUploadModal from '../Modals/ImageUploadModal.svelte';

	let file: File | null = null;

	function onFileSelected(e: any) {
		if (!e.target.files[0].type.startsWith('image/')) return;

		file = e.target.files[0];

		openEditModal();
	}

	function openEditModal() {
		if (!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			if (!file || !e.target) return;

			openModal(ImageUploadModal, {
				imageSrc: e.target.result as string,
				onConfirm
			});
		};

		reader.readAsDataURL(file);
	}

	function onConfirm(canvas: HTMLCanvasElement | undefined) {
		canvas?.toBlob((blob) => {
			value = blob;
		});
	}
</script>

<Wrapper>
	<Label {id} {label} />
	<input type="file" name={id} {id} on:change={onFileSelected} />

	<button type="button" on:click={openEditModal}>edit</button>
	<Error {errors} />
</Wrapper>

<style lang="scss" scoped>
	@import './style.scss';
</style>
