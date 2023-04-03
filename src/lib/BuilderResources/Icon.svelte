<script>
	// @ts-nocheck
	import {
		LetterAa,
		Paragraph,
		TextFont,
		Image,
		List,
		TextNewLine,
		PanHorizontal,
		ListChecked,
		ListBoxes,
		StringText,
		StringInteger,
		TextAlignLeft,
		ListNumbered,
		WatsonHealthFusionBlender,
		DownToBottom
	} from 'carbon-icons-svelte';

	export let type;
</script>

{#if type == 'Paragraph'}
	<Paragraph size={32} />
{:else if type == 'Text Block'}
	<LetterAa size={32} />
{:else if type == 'List'}
	<List size={32} />
{:else if type == 'Line Break'}
	<TextNewLine size={32} />
{:else if type == 'Horizontal Line'}
	<PanHorizontal size={32} />
{:else if type == 'Dropdown Select'}
	<DownToBottom size={32} />
{:else if type == 'Single Select'}
	<ListBoxes size={32} />
{:else if type == 'Multiple Select'}
	<ListChecked size={32} />
{:else if type == 'Text Input'}
	<StringText size={32} />
{:else if type == 'Number Input'}
	<StringInteger size={32} />
{:else if type == 'Textarea Input'}
	<TextAlignLeft size={32} />
{:else if type == 'Ranking'}
	<ListNumbered size={32} />
{:else if type == 'Range Select'}
	<WatsonHealthFusionBlender size={32} />
{:else if type == 'Image'}
	<Image size={32} />
{/if}
