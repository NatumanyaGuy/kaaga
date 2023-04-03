<script>
	// @ts-nocheck

	export let label;
	import { TextInput } from 'carbon-components-svelte';
</script>

<TextInput
	size="xl"
	warn={label == ''}
	warnText="Please enterQuestion label"
	placeholder="Question Label"
	helperText="Label appears above the Input guiding on what to input"
	bind:value={label}
/>

<br />
