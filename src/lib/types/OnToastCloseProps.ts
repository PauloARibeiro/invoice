import type Direction from '$lib/enums/Direction';

export interface OnToastCloseProps {
	id: string;
	dragged?: ToastActionProp;
	swiped?: ToastActionProp;
}

export interface ToastActionProp {
	direction: Direction;
}
