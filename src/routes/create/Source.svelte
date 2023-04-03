<script>
	// @ts-nocheck

	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	export let items;
	const flipDurationMs = 300;
	let shouldIgnoreDndEvents = false;
	function handleDndConsider(e) {
		// console.warn(`got consider ${JSON.stringify(e.detail, null, 2)}`);
		const { trigger, id } = e.detail.info;
		if (trigger === TRIGGERS.DRAG_STARTED) {
			// console.warn(`copying ${id}`);
			const idx = items.findIndex((item) => item.id === id);
			const newId = `${id}_kaaga_${Math.round(Math.random() * 100000)}`;
			// the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above
			e.detail.items = e.detail.items.filter((item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
			e.detail.items.splice(idx, 0, { ...items[idx], id: newId });
			items = e.detail.items;
			shouldIgnoreDndEvents = true;
		} else if (!shouldIgnoreDndEvents) {
			items = e.detail.items;
		} else {
			items = [...items];
		}
	}
	function handleDndFinalize(e) {
		// console.warn(`got finalize ${JSON.stringify(e.detail, null, 2)}`);
		if (!shouldIgnoreDndEvents) {
			items = e.detail.items;
		} else {
			items = [...items];
			shouldIgnoreDndEvents = false;
		}
	}

	import { ClickableTile } from 'carbon-components-svelte';
	import Icon from '$lib/BuilderResources/Icon.svelte';
</script>

<section
	use:dndzone={{ items, flipDurationMs }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	dropFromOthersDisabled={true}
	class="grid grid-cols-3 gap-3 mt-2"
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<ClickableTile light class="h-24">
				<div class="flex flex-row justify-center">
					<Icon type={item.name} />
				</div>
				<p class="text-center pad-right text-sm">{item.name}</p>
			</ClickableTile>
		</div>
	{/each}
</section>
