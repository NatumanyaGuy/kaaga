<script>
	// @ts-nocheck

	export let device = 'w-5/12';
	import { Button, Tile, TooltipIcon } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';
</script>

<div class="flex flex-row gap-2">
	<TooltipIcon tooltipText="Smartphone">
		<Button
			size="small"
			kind="ghost"
			class="px-1 "
			isSelected={device == 'w-5/12'}
			iconDescription="Smartphone"
			on:click={() => {
				device = 'w-5/12';
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path d="M8 16.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
				<path
					fill-rule="evenodd"
					d="M4 4a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V2.5h1A1.5 1.5 0 0114.5 4v12a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16V4A1.5 1.5 0 017 2.5h1z"
					clip-rule="evenodd"
				/>
			</svg>
		</Button>
	</TooltipIcon>

	<TooltipIcon tooltipText="Tablet">
		<Button
			size="small"
			kind="ghost"
			class="px-1"
			isSelected={device == 'w-3/4'}
			iconDescription="Zoom In"
			on:click={() => {
				device = 'w-3/4';
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					fill-rule="evenodd"
					d="M5 1a3 3 0 00-3 3v12a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3H5zM3.5 4A1.5 1.5 0 015 2.5h10A1.5 1.5 0 0116.5 4v12a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 16V4zm5.25 11.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</Button>
	</TooltipIcon>

	<TooltipIcon tooltipText="PC">
		<Button
			size="small"
			kind="ghost"
			isSelected={device == 'w-full'}
			class="px-1"
			iconDescription="PC"
			on:click={() => {
				device = 'w-full';
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 fill-current"
			>
				<path
					fill-rule="evenodd"
					d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</Button>
	</TooltipIcon>
</div>
