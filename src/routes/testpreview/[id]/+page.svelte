<script>
	// @ts-nocheck
	import {
		ExpandableTile,
		Tag,
		DataTable,
		Toolbar,
		ToolbarContent,
		Pagination,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button
	} from 'carbon-components-svelte';
	import { identity } from 'svelte/internal';
	export let data;
	// console.log(data);

	function createHeaders(obj) {
		console.log(Object.keys(obj));

		obj = Object.keys(obj);
		let arr = [];
		// for (let [key, value] of Object.entries(obj)) {
		// 	// console.log(key, value);
		// 	arr = [...arr, { key, value: key }];
		// }
		obj.forEach((e) => {
			arr = [...arr, { key: e, value: e }];
		});
		arr = arr.filter((x) => {
			return x.key !== 'id';
		});
		return arr;
	}
	let pageSize = 50;
	let page = 1;

	//Export Data

	// convert arrays to string
	function arrToString(data) {
		data.forEach((x) => {
			for (let [key, value] of Object.entries(x)) {
				// console.log(key, value);
				if (Array.isArray(value)) {
					x[key] = value.toString();
				}
			}
		});
		return data;
	}

	// import { read, writeFileXLSX } from 'xlsx';
	import XLSX from 'xlsx';

	function exportToXLSX(data) {
		// Create a new workbook
		const workbook = XLSX.utils.book_new();

		// Convert the data array to a worksheet
		const worksheet = XLSX.utils.json_to_sheet(data);

		// Add the worksheet to the workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		// Write the workbook to an XLSX file
		XLSX.writeFile(workbook, 'data.xlsx');
	}
</script>

<svelte:head>
	<title>Kaaga – {data?.title}</title>
</svelte:head>

<br />

{#if data?.responses.length == 0}
	<h3>{data?.title}</h3>
	<p class="pad-right">{data?.description}</p>
	<hr class="" />
	<div class="flex flex-row justify-center items-center h-[40vh]">
		<p>No responses yet</p>
	</div>
{:else}
	<DataTable
		sortable
		size="medium"
		title={data?.title}
		description={data?.description}
		headers={createHeaders(data?.responses[0])}
		rows={data?.responses}
		{pageSize}
		{page}
	>
		<Toolbar size="md">
			<ToolbarContent>
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Refresh</ToolbarMenuItem>

					<ToolbarMenuItem hasDivider danger>Stop</ToolbarMenuItem>
				</ToolbarMenu>
				<Button
					on:click={() => {
						//Convert Arrays to Strings then Export
						exportToXLSX(arrToString(data?.responses));
						// console.log();
					}}>Export to XLSX</Button
				>
			</ToolbarContent>
		</Toolbar>
	</DataTable>

	<Pagination bind:pageSize bind:page totalItems={data?.responses.length} pageSizeInputDisabled />
{/if}
