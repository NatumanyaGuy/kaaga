<script>
	// @ts-nocheck

	import { quill } from 'svelte-quill';
	let toolbarOptions = [
		[{ header: 1 }, { header: 2 }],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	let options = {
		placeholder: 'Edit this Text Block...',
		modules: {
			toolbar: toolbarOptions
		}
	};

	export let text = { html: '', text: '' };
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<main>
	<div class="editor" use:quill={options} on:text-change={(e) => (text = e.detail)}>
		<span>
			{@html text.html}
		</span>
	</div>
</main>
