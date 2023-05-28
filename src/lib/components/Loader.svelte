<script>
	import { beforeUpdate } from 'svelte';
	import Loader from '../stores/loader';
	import ScrollHandler from '$lib/services/scrollHandler';
	import { fade, scale } from 'svelte/transition';

	beforeUpdate(() => {
		$Loader.isLoading ? ScrollHandler.hideY() : ScrollHandler.showY();
	});
</script>

{#if $Loader.isLoading}
	<section transition:fade={{ duration: 150 }}>
		<div class="wrapper" transition:scale={{ duration: 300 }}>
			<span class="loader" />
			<h5>{@html $Loader.message ?? 'Loading'}</h5>
		</div>
	</section>
{/if}

<style lang="scss" scoped>
	section {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 2.4rem;
		backdrop-filter: var(--overlay-blur);
		background-color: rgba(var(--c-black-rgb), 0.2);
		z-index: 999;
	}

	.wrapper {
		background-color: rgba(var(--c-black-rgb), 0.3);
		backdrop-filter: var(--overlay-blur);
		min-width: 18rem;
		border-radius: 1.4rem;
		z-index: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 1.4rem 2rem 2rem;
		gap: 1.4rem;
	}

	h5 {
		z-index: 2;
		color: var(--c-white);
		font-size: 1.8rem;
		margin: 0;
	}

	.loader {
		width: 48px;
		height: 40px;
		margin-top: 30px;
		display: inline-block;
		position: relative;
		background: #fff;
		border-radius: 15% 15% 35% 35%;
	}
	.loader::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 45px;
		top: 8px;
		border: 4px solid #fff;
		width: 16px;
		height: 20px;
		border-radius: 0 4px 4px 0;
	}
	.loader::before {
		content: '';
		position: absolute;
		width: 1px;
		height: 10px;
		color: #fff;
		top: -15px;
		left: 11px;
		box-sizing: border-box;
		animation: animloader 1s ease infinite;
	}

	@keyframes animloader {
		0% {
			box-shadow: 2px 0px rgba(255, 255, 255, 0), 12px 0px rgba(255, 255, 255, 0.3),
				20px 0px rgba(255, 255, 255, 0);
		}
		50% {
			box-shadow: 2px -5px rgba(255, 255, 255, 0.5), 12px -3px rgba(255, 255, 255, 0.5),
				20px -2px rgba(255, 255, 255, 0.6);
		}
		100% {
			box-shadow: 2px -8px rgba(255, 255, 255, 0), 12px -5px rgba(255, 255, 255, 0),
				20px -5px rgba(255, 255, 255, 0);
		}
	}
</style>
