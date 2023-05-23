import { writable } from 'svelte/store';

type Callback = (() => void) | null;

interface AlertProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm?: Callback;
	onCancel?: Callback;
	closeOnConfirm?: boolean;
	closeOnCancel?: boolean;
}

const initialState = {
	isOpen: false,
	title: '',
	message: '',
	onConfirm: null,
	onCancel: null,
	closeOnConfirm: true,
	closeOnCancel: true
};

function createAlertStore() {
	const { subscribe, update } = writable<AlertProps>(initialState);

	const set = (props: AlertProps) => {
		update(() => ({ ...initialState, ...props }));
	};

	const reset = () => {
		update(() => ({ ...initialState }));
	};

	const setMessage = (message: string) => {
		update((state) => ({ ...state, message }));
	};

	const setTitle = (title: string) => {
		update((state) => ({ ...state, title }));
	};

	const setIsOpen = (isOpen: boolean) => {
		update((state) => ({ ...state, isOpen }));
	};

	const setOnCancel = (onCancel: Callback) => {
		update((state) => ({ ...state, onCancel }));
	};

	const setOnConfirm = (onConfirm: Callback) => {
		update((state) => ({ ...state, onConfirm }));
	};

	return {
		subscribe,
		setTitle,
		setMessage,
		set,
		reset,
		setIsOpen,
		setOnCancel,
		setOnConfirm
	};
}

export default createAlertStore();
