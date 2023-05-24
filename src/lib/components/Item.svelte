<script>
	let startX;
	let currentX;
	let isSwiping = false;
	let threshold = 100; // Adjust this value as per your needs

	function handleStart(event) {
		startX = getClientX(event);
		isSwiping = true;

		addEventListeners();
	}

	function handleMove(event) {
		if (!isSwiping) return;
		currentX = getClientX(event);
	}

	function handleEnd(event) {
		if (!isSwiping) return;
		isSwiping = false;

		removeEventListeners();

		const diffX = currentX - startX;

		if (Math.abs(diffX) > threshold) {
			// If the swipe distance exceeds the threshold, delete the item
			deleteItem();
		} else {
			// Otherwise, reset the item's position
			resetPosition();
		}
	}

	function deleteItem() {
		// Perform the deletion logic for the item
		// This can involve removing the item from the list or marking it as deleted
		console.log('Item deleted!');
	}

	function resetPosition() {
		// Reset the item's position back to its initial state
		startX = null;
		currentX = null;
	}

	function getClientX(event) {
		return event.touches ? event.touches[0].clientX : event.clientX;
	}

	function addEventListeners() {
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('mouseup', handleEnd);
	}

	function removeEventListeners() {
		window.removeEventListener('mousemove', handleMove);
		window.removeEventListener('mouseup', handleEnd);
	}
</script>

<div
	class="item"
	style={`transform: translateX(${currentX}px)`}
	on:mousedown={handleStart}
	on:touchstart={handleStart}
>
	<slot />
	<!-- Display item content here -->
</div>

<style>
	.item {
		/* Define your item styles, such as height, width, and appearance */
		transition: transform 0.3s ease-out;
		touch-action: pan-y;
	}
</style>
