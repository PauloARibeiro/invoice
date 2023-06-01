import { writable } from 'svelte/store';
import type { ComponentType, SvelteComponentTyped } from 'svelte';

type Icon = ComponentType<SvelteComponentTyped>;

export interface Toast {
	id: string;
	isOpen: boolean;
	message: string;
	icon?: Icon;
	_timeout: NodeJS.Timeout | null;
	_shouldTimeout: boolean;
}

interface Toaster {
	toasts: Map<string, Toast>;
	recentToast?: Toast;
	oldestToast?: Toast;
}

function createToasterStore() {
	const { subscribe, update } = writable<Toaster>({
		recentToast: undefined,
		oldestToast: undefined,
		toasts: new Map()
	});

	const _getOldestToast = (toasts: Map<string, Toast>) => {
		const [toast] = toasts.values();

		return toast;
	};

	const _getRecentToast = (toasts: Map<string, Toast>) => {
		const toast = Array.from(toasts)[toasts.size - 1];

		return toast ? toast[1] : undefined;
	};

	const notify = (message: string, icon?: Icon, shouldTimeout = false) => {
		update((state) => {
			const id = `${Date.now()}-${Math.random()}`;
			const toast = {
				id,
				message,
				icon,
				isOpen: true,
				_shouldTimeout: shouldTimeout,
				_timeout: shouldTimeout ? setTimeout(() => remove(id), 5000) : null
			};

			state.toasts.set(id, toast);
			state.recentToast = _getRecentToast(state.toasts);
			state.oldestToast = _getOldestToast(state.toasts);

			return state;
		});
	};

	const remove = (toastId: string) => {
		update((state) => {
			state.toasts.delete(toastId);

			state.oldestToast = _getOldestToast(state.toasts);
			state.recentToast = _getRecentToast(state.toasts);

			return state;
		});
	};

	const removeTimer = (toastId: string) => {
		update((state) => {
			const toast = state.toasts.get(toastId);

			if (!toast || (toast && !toast._shouldTimeout)) return state;

			toast._timeout && clearTimeout(toast._timeout);

			return state;
		});
	};

	const addTimer = (toastId?: string) => {
		if (!toastId) return;

		update((state) => {
			const toast = state.toasts.get(toastId);

			if (!toast || (toast && !toast._shouldTimeout)) return state;

			toast._timeout = setTimeout(() => remove(toastId), 3000);

			return state;
		});
	};

	const removeTimerFromAll = () => {
		update((state) => {
			state.toasts.forEach((toast) => removeTimer(toast.id));

			return state;
		});
	};

	const addTimerToAll = (timeout = 1500) => {
		update((state) => {
			// This makes it so all the toasts get removed at the same time
			let additionalTimeout = 0;

			state.toasts.forEach((toast) => {
				if (!toast._shouldTimeout) return state;

				toast._timeout = setTimeout(() => remove(toast.id), timeout + additionalTimeout);

				additionalTimeout += 550;
			});

			return state;
		});
	};

	const clearAll = () => {
		update((state) => {
			state.toasts.clear();

			state.oldestToast = undefined;
			state.recentToast = undefined;

			return state;
		});
	};

	return {
		subscribe,
		notify,
		remove,
		removeTimer,
		addTimer,
		removeTimerFromAll,
		addTimerToAll,
		clearAll
	};
}

export default createToasterStore();
