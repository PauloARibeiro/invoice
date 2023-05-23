import { writable } from 'svelte/store';

function createLoaderStore() {
	const { subscribe, update } = writable({
		isLoading: false,
		message: 'Loading'
	});

	const set = (isLoading: boolean, message: string) => {
		update(() => ({ isLoading, message }));
	};

	const reset = () => {
		update(() => ({ isLoading: false, message: '' }));
	};

	const setMessage = (message: string) => {
		update((state) => ({ ...state, message }));
	};

	const setIsLoading = (isLoading: boolean) => {
		update((state) => ({ ...state, isLoading }));
	};

	return {
		subscribe,
		setIsLoading,
		setMessage,
		set,
		reset
	};
}

export default createLoaderStore();
