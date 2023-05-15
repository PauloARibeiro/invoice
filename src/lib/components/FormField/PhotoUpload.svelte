<script lang="ts">
	export let id = '';
	export let label = '';
	export let errors: string[] | undefined = undefined;
	export let value: any = undefined;

	import Cropper from 'svelte-easy-crop';

	import Error from './_Error.svelte';
	import Label from './_Label.svelte';
	import Wrapper from './_Wrapper.svelte';

	let image: string;
	let test: string;

	function onFileSelected(e: any) {
		let imageFile = e.target.files[0];
		let reader = new FileReader();

		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				image = e.target.result;
			}
		};
		reader.readAsDataURL(imageFile);
	}
</script>

<Wrapper>
	<Label {id} {label} />
	<input type="file" name={id} {id} bind:value on:change={onFileSelected} />
	<Error {errors} />

	<!-- <div style="position: relative; max-width: 600px; height: 200px;"> -->

	<!-- </div> -->
</Wrapper>

<div style="position:relative; width: 50%; height: 300px;">
	<Cropper
		{image}
		cropShape="round"
		aspect={1}
		showGrid={false}
		zoom={1}
		crop={{ x: 0, y: 0 }}
		on:cropcomplete={(e) => {
			console.log(e);
			test = e.explicitOriginalTarget.previousElementSibling.currentSrc;
		}}
	/>
</div>

<img src={test} alt="" srcset="" />

<style lang="scss" scoped>
	@import './style.scss';
</style>
