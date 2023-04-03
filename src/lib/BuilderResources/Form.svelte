<script>
	import { TextInput, TextArea } from 'carbon-components-svelte';
	export let title = '';
	export let id = '';
	export let description = '';
	export let src = 'main';
</script>

<div class="p-8">
	<div class="flex flex-row gap-3 mt-3 ">
		<TextInput light={false} bind:value={title} labelText="" placeholder="Test Title" />
		<TextInput
			disabled={src == 'modal'}
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
	<TextArea light={false} bind:value={description} labelText="" placeholder="Test Description" />
</div>
