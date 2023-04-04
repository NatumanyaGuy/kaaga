<script>
	import { TextInput, TextArea } from 'carbon-components-svelte';
	export let title = '';
	export let id = '';
	export let description = '';
	export let src = 'main';
	export let disabled = false;
</script>

<div class="p-8">
	<div class="flex flex-col lg:flex-row md:flex-row gap-3 mt-3 ">
		<TextInput light={false} bind:value={title} labelText="" placeholder="Test Title" {disabled} />
		<TextInput
			disabled={src == 'modal' ? true : disabled}
			light={false}
			on:keyup={() => {
				id = id.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
			}}
			bind:value={id}
			helperText={src == 'modal' ? '' : 'Please use letters and numbers only'}
			labelText=""
			placeholder="Test ID"
		/>
	</div>
	<br />
	<TextArea
		{disabled}
		light={false}
		bind:value={description}
		labelText=""
		placeholder="Test Description"
	/>
</div>
