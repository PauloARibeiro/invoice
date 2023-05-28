import { browser } from '$app/environment';

type State = 'hidden' | 'auto';
type OverFlowKey = 'overflowY' | 'overflowX';

function _handle(state: State, overflowKey: OverFlowKey) {
	if (browser) {
		const body = document.querySelector('body');

		if (!body) return;

		body.style[overflowKey] = state;
	}
}

function showY() {
	_handle('auto', 'overflowY');
}

function hideY() {
	_handle('hidden', 'overflowY');
}

export default {
	showY,
	hideY
};
