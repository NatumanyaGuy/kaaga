<script>
	// @ts-nocheck

	export let text;
	export let type;

	import { TextArea } from 'carbon-components-svelte';
</script>

<TextArea
	size="xl"
	placeholder="{type} text"
	helperText="This is the text content of the {type}"
	bind:value={text}
/>
