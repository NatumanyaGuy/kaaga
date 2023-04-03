<script>
	// @ts-nocheck

	export let variable;
	import { TextInput } from 'carbon-components-svelte';
</script>

<TextInput
	size="xl"
	warn={variable == ''}
	invalid={variable.length >= 30}
	invalidText="Please use a maximum of 30 characters for this variable"
	warnText="Please enter the variable you're investigating"
	placeholder="Variable you're investigating"
	on:keyup={() => {
		variable = variable.replace(/[^A-Z]+/gi, '_').toLowerCase();
	}}
	helperText="Variable you're investigating; e.g. user_name, selected_sample"
	bind:value={variable}
/>

<br />
