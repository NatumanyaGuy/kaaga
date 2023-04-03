<script>
	// @ts-nocheck

	import { Tile, Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';

	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { uid } from '$lib/JS/custom.js';
</script>

<div class="flex flex-row justify-end mb-5">
	<div>
		<Breadcrumb noTrailingSlash>
			<BreadcrumbItem href="/">Kaaga</BreadcrumbItem>
			<BreadcrumbItem href="/settings" isCurrentPage>Settings</BreadcrumbItem>
		</Breadcrumb>
	</div>
</div>
