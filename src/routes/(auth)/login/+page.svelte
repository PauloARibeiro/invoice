<script lang="ts">
	import Alert from '$lib/stores/alert';
	import Loader from '$lib/stores/loader';

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
