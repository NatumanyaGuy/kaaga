<script>
	// @ts-nocheck

	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import SortableList from 'svelte-sortable-list';

	export let items = [];
	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
	export let active;
	export let width = 'w-5/12';

	import {
		Tile,
		TileGroup,
		RadioTile,
		Select,
		SelectItem,
		TextArea,
		TextInput,
		SelectableTile,
		Modal,
		NumberInput,
		Tag,
		Slider
	} from 'carbon-components-svelte';
	import { ImageSearch } from 'carbon-icons-svelte';

	let open = false;
	let imageSrc = '';
</script>

<section
	use:dndzone={{ items, flipDurationMs }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	class="h-[90vh] {width} mx-auto shadow-lg overflow-y-scroll border-4 border-dashed 
	bx--tile 
    rounded-md border-slate-900 px-2 transition ease-in-out delay-150 duration-300"
	dropTargetStyle={{ outline: 'rgba(15, 23, 42, 1 ) dashed 4px' }}
>
	{#each items as item (item.id)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<div
			animate:flip={{ duration: flipDurationMs }}
			on:click={() => {
				active = item;
				// console.log(item?.id);
			}}
			class="w-full gap-2 p-1.5 my-2  
			hover:bg-slate-100
			{active.id == item.id ? 'transition ease-in border-2 border-solid border-slate-900 shadow-xl' : ''}
			   "
		>
			<!-- {#if (active.id == item.id) == true}
				<div class="left-3 top-0 fixed z-50">ACTIVE</div>
			{/if} -->

			{#if item.name == 'Text Block'}
				<!-- Paragraph  -->
				<p class="pad-right ">
					{@html item.text?.html}
				</p>
				<!-- Line Break  -->
			{:else if item.name == 'Line Break'}
				<p class="" />
				<!-- Horizontal Line  -->
			{:else if item.name == 'Horizontal Line'}
				<hr class=" " />
				<!-- Dropdown Select  -->
			{:else if item.name == 'Dropdown Select'}
				<div>
					<p class="bx--label">{item.label}</p>
					<Select labelText="">
						{#each item.options as option}
							<SelectItem value={option.text} light />
						{/each}
					</Select>
					<p class="pad-right font-light text-sm text-end">{item.HelperText}</p>
				</div>

				<!-- Single Select  -->
			{:else if item.name == 'Single Select'}
				<div>
					<p class="bx--label">{item.label}</p>
					<TileGroup legend="" light>
						{#each item.options as option}
							<RadioTile value={option.text}>{option.text}</RadioTile>
						{/each}
					</TileGroup>
					<p class="pad-right font-light text-sm">{item.HelperText}</p>
				</div>
				<!-- Multiple Select  -->
			{:else if item.name == 'Multiple Select'}
				<div>
					<p class="bx--label">{item.label}</p>
					<TileGroup legend="" light>
						{#each item.options as option}
							<SelectableTile value={option.text}>{option.text}</SelectableTile>
						{/each}
					</TileGroup>
					<p class="pad-right font-light text-sm">{item.HelperText}</p>
				</div>
				<!-- Text Input  -->
			{:else if item.name == 'Text Input'}
				<div>
					<TextInput
						labelText={item.label}
						placeholder={item.placeholder}
						helperText={item.HelperText}
						light
					/>
					<br />
				</div>
				<!-- Number Input  -->
			{:else if item.name == 'Number Input'}
				<div>
					<NumberInput
						value="0"
						label={item.label}
						placeholder={item.placeholder}
						helperText={item.HelperText}
						light
					/>
					<br />
				</div>
				<!-- Textarea Input  -->
			{:else if item.name == 'Textarea Input'}
				<div>
					<TextArea
						labelText={item.label}
						placeholder={item.placeholder}
						helperText={item.HelperText}
						light
					/>
					<br />
				</div>
				<!-- Ranking Input  -->
			{:else if item.name == 'Ranking'}
				<p class="bx--label">{item.label}</p>
				{#each item.options as option, index}
					<Tile>
						<div class="flex flex-row">
							<div class="basis-1/12">
								<Tag type="outline" size="sm">{index + 1}</Tag>
							</div>
							<h5 class="text-center basis-11/12">{option.text}</h5>
						</div>
					</Tile>
				{/each}

				<!-- Range - Slider  -->
			{:else if item.name == 'Range Select'}
				<div>
					<Slider fullWidth labelText={item.label} min={item.min} max={item.max} hideTextInput />
					<small class="pad-right font-light" style="font-size:11px;">{item.HelperText}</small>
					<br />
				</div>
			{:else if item.name == 'Image'}
				<div class="flex flex-row justify-center">
					{#if item.dataURL == ''}
						<div class="flex flex-col gap-1 ">
							<div class="flex flex-row justify-center">
								<ImageSearch size={32} class="mx-auto" />
							</div>
							<p class="pad-right text-center font-light">Please select and Image</p>
						</div>
					{:else}
						<img
							on:dblclick={() => {
								imageSrc = item.dataURL;
								// alert('dbl click');
								open = true;
							}}
							src={item.dataURL}
							class="mx-auto max-h-[7rem] h-auto w-fit object-contain"
							alt="Photo_Image"
						/>
					{/if}
				</div>
				<br />
			{/if}
		</div>
	{/each}
</section>

<!-- Image View  -->
<Modal passiveModal bind:open modalHeading="View Image" on:open on:close size="lg">
	<div class="flex flex-row justify-center">
		<img
			src={imageSrc}
			class="mx-auto max-w-[70vw] w-[65vw] h-auto object-contain"
			alt="Photo_Image"
		/>
	</div>
</Modal>

<style>
</style>
