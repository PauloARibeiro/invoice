import { writable } from 'svelte/store';

interface Toast {
	id: string;
	isOpen: boolean;
	message: string;
	icon?: any;
}

interface Toaster {
	toasts: Toast[];
}

function createToasterStore() {
	const { subscribe, update } = writable<Toaster>({
		// isOpen: false,
		// message: 'Loading'
		toasts: []
	});

	// const set = (isOpen: boolean, message: string) => {
	// 	update(() => ({ isOpen, message }));
	// };

	// const reset = () => {
	// 	update(() => ({ isOpen: false, message: '' }));
	// };

	// const setMessage = (message: string) => {
	// 	update((state) => ({ ...state, message }));
	// };

	// const setIsOpen = (isOpen: boolean) => {
	// 	update((state) => ({ ...state, isOpen }));
	// };

	const notify = (message: string, icon?: any) => {
		const id = `${Date.now()}-${Math.random()}`;

		update((state) => ({ toasts: [...state.toasts, { isOpen: true, message, id, icon }] }));
	};

	return {
		subscribe,
		notify
		// setIsOpen,
		// setMessage,
		// set,
		// reset
	};
}

export default createToasterStore();
