<script>
	// @ts-nocheck

	export let listText;

	import { TextArea } from 'carbon-components-svelte';
</script>

<TextArea
	placeholder=""
	class="w-full"
	cols="100"
	rows="8"
	helperText="Enter your list, with each list item on a new line"
	bind:value={listText}
	on:keyup={() => {
		// console.log(listText);
	}}
/>
