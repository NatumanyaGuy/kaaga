<script>
	// @ts-nocheck

	export let helpertext;
	import { TextInput } from 'carbon-components-svelte';
</script>

<TextInput
	size="xl"
	placeholder="Helper Text"
	bind:value={helpertext}
	helperText="Helper text will appear below the input with a guide on what to input ."
/>
