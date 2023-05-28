<script lang="ts">
	import Alert from '$lib/stores/alert';
	import Loader from '$lib/stores/loader';
	import Toaster from '$lib/stores/toaster';

	import CancelIcon from '$lib/components/Icons/colored/CancelIcon.svelte';

	function testAlert() {
		Alert.set({
			isOpen: true,
			title: 'title',
			message: 'message',
			onConfirm: () => {
				Loader.set(true, 'im loading bruh');

				setTimeout(() => {
					Loader.reset();
				}, 2000);
			}
		});
	}
</script>

<form method="POST">
	<label for="username">Username</label>
	<input type="text" id="username" name="username" required />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">Login</button>
</form>

<button on:click={testAlert}>test alert</button>
<button
	on:click={() => {
		Loader.set(true, 'im loading bruh');

		setTimeout(() => {
			Loader.reset();
		}, 2000);
	}}>test loader</button
>

<button
	on:click={() =>
		Toaster.notify(
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo magnam ea cum enim, quam ullam eos a minus aliquam iusto quae culpa sunt debitis dolores?',
			CancelIcon
		)}>open toaster</button
>

<button on:click={() => Toaster.notify('Client foi criado', CancelIcon)}>open toaster</button>
