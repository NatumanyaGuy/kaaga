<script>
	// @ts-nocheck

	import { Button, Toggle } from 'carbon-components-svelte';
	export let compulsory;
</script>

<div class=" my-2">
	<span>
		<Toggle
			labelText=""
			hideLabel
			size="sm"
			toggled={compulsory}
			on:toggle={(e) => {
				if (e.detail.toggled == true) {
					compulsory = true;
				} else {
					compulsory = false;
				}
			}}
		>
			<span slot="labelA">Optional</span>
			<span slot="labelB">Compulsory</span>
		</Toggle>
	</span>
</div>
