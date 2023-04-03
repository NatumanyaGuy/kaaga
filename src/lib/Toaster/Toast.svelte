<script>
	// @ts-nocheck

	import { fade, fly } from 'svelte/transition';
	import { notifications } from '$lib/Toaster/toastStore';
	import { ToastNotification, Button } from 'carbon-components-svelte';
</script>

{#if $notifications}
	<div class="top-10 left-16 fixed z-up">
		<div class="flex flex-col gap-2">
			{#each $notifications as notification}
				<div in:fly={{ duration: 300, y: 50 }} out:fade class="">
					<ToastNotification
						kind={notification.type}
						title=""
						subtitle={notification.message}
						caption=""
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.z-up {
		z-index: 99999999;
	}
</style>
