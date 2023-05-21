import { writable } from 'svelte/store';

export const loader = writable({
	loading: false,
	message: 'Loading'
});

function setLoaderState(loading: boolean, message: string) {
	loader.update(() => {
		return {
			loading,
			message
		};
	});
}

function setLoaderMessage(message: string) {
	loader.update((state) => {
		return {
			loading: state.loading,
			message
		};
	});
}

function setLoaderLoading(loading: boolean) {
	loader.update((state) => {
		return {
			loading,
			message: state.message
		};
	});
}

export { setLoaderLoading, setLoaderMessage, setLoaderState };
