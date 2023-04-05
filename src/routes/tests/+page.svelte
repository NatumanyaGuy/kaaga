<script>
	// @ts-nocheck
	import {
		DataTableSkeleton,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Pagination,
		Grid,
		Row,
		Column,
		Breadcrumb,
		BreadcrumbItem,
		ToolbarMenu,
		ToolbarMenuItem,
		Modal,
		OverflowMenu,
		OverflowMenuItem,
		Button,
		CopyButton,
		Link
	} from 'carbon-components-svelte';
	import { kaaga_user } from '$lib/Stores/localStore.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import QRCode from '$lib/UI/QRCode.svelte';
	import { db } from '$lib/firebaseConfig';
	import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
	import { toast } from '$lib/Toaster/toastStore';
	import { CopyLink, Share, VirtualColumnKey } from 'carbon-icons-svelte';

	//Retrieve Function
	async function getTests() {
		rows = [];
		const testersRef = collection(db, 'tests');
		const q = query(testersRef, where('creator', '==', $kaaga_user.email));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, ' => ', doc.data());
			var d = doc.data();
			d.fireID = doc.id;
			rows = [...rows, d];
			return rows;
		});
	}

	let rows = [];
	let pageSize = 10;
	let page = 1;
	let filteredRowIds = [];

	// $: console.log('filteredRowIds', filteredRowIds);

	//Loading logic
	let data;
	let loaded = false;
	onMount(async () => {
		data = await getTests();
		loaded = true;
	});

	//QR Code
	let qrOpen = false;
	let link = 'https://muriro.com';

	//Delete Test
	let deleteOpen = false;
	let toDelete;

	//Loop Hole to bypass 3 tests per month

	async function deleteTest(id) {
		loaded = false;
		deleteOpen = false;

		await deleteDoc(doc(db, 'tests', id))
			.then(() => {
				toast('Deleted!', 'success');
				data = getTests();
			})
			.catch((e) => {
				console.log(e);
			});
		loaded = true;
	}
</script>

<svelte:head>
	<title>Kaaga – Tests</title>
</svelte:head>

<Grid>
	<Row>
		<Column />

		<Column>
			<div class="flex flex-row justify-end">
				<div>
					<Breadcrumb noTrailingSlash>
						<BreadcrumbItem href="/">Kaaga</BreadcrumbItem>
						<BreadcrumbItem href="/tests" isCurrentPage>Tests</BreadcrumbItem>
					</Breadcrumb>
				</div>
			</div>
		</Column>
	</Row>
</Grid>

<br />

{#if loaded}
	<div in:fade>
		<DataTable
			headers={[
				{ key: 'title', value: 'Title' },
				// { key: 'desc', value: 'Desc' },
				{ key: 'id', value: 'ID' },
				// { key: 'status', value: 'Status' },
				{ key: 'responses', value: 'Responses' },
				{ key: 'overflow', empty: true }
			]}
			expandable
			zebra
			{rows}
			{pageSize}
			sortable
			{page}
		>
			<Toolbar>
				<Toolbar>
					<ToolbarContent>
						<ToolbarSearch
							persistent
							value=""
							placeholder="Search by title..."
							shouldFilterRows
							bind:filteredRowIds
						/>
						<!-- <ToolbarMenu>
							<ToolbarMenuItem>Refresh</ToolbarMenuItem>
							<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
						</ToolbarMenu> -->
						<Button href="/create">New Test</Button>
					</ToolbarContent>
				</Toolbar>
			</Toolbar>

			<svelte:fragment slot="cell" let:cell let:row>
				{#if cell.key === 'overflow'}
					<OverflowMenu flipped>
						<div class="flex flex-row justify-center">
							<Button
								iconDescription="Copy Test URL"
								kind="ghost"
								icon={CopyLink}
								on:click={() => {
									// Copy the text inside the text field
									navigator.clipboard.writeText(`https://kaaga.vercel.app/${row.id}`);
									toast(`URL for ${row.title} copied!`, 'success');
								}}
							/>

							<Button
								iconDescription="Copy Test ID"
								kind="ghost"
								icon={VirtualColumnKey}
								on:click={() => {
									// Copy the text inside the text field
									navigator.clipboard.writeText(row.id);
									toast(`ID for ${row.title} copied!`, 'success');
								}}
							/>
							<Button
								kind="ghost"
								icon={Share}
								iconDescription="Share Test"
								on:click={async () => {
									const shareData = {
										title: 'Kaaga',
										text: row.title,
										url: `https://kaaga.vercel.app/${row.id}`
									};

									try {
										await navigator.share(shareData);
										console.log('Shared successfully');
									} catch (err) {
										console.log(`Error: ${err}`);
									}
								}}
							/>
						</div>

						<OverflowMenuItem
							text="Generate QR Code"
							on:click={() => {
								qrOpen = true;
								link = 'https://kaaga.vercel.app/' + row.id;
							}}
						/>

						<OverflowMenuItem text="View" href="/testpreview/{row.id}" />
						<!-- <OverflowMenuItem
					text="Update"
					on:click={() => {
						console.log(row.id);
					}}
				/> -->
						<OverflowMenuItem
							danger
							text="Delete"
							on:click={() => {
								deleteOpen = true;
								toDelete = row;
								console.log(toDelete);
							}}
						/>
					</OverflowMenu>
				{:else if cell.key === 'responses'}
					{row.responses.length}
				{:else}{cell.value}{/if}
			</svelte:fragment>

			<svelte:fragment slot="expanded-row" let:row>
				<div>{row.description}</div>
			</svelte:fragment>
		</DataTable>

		<Pagination bind:pageSize bind:page totalItems={filteredRowIds.length} pageSizeInputDisabled />
	</div>
{:else}
	<DataTableSkeleton
		showHeader={false}
		showToolbar={true}
		headers={[{ value: 'Title' }, { value: 'ID' }, { value: 'Responses' }, { empty: true }]}
		rows={5}
	/>
{/if}

<!-- QR COde Modal  -->
<Modal
	bind:open={qrOpen}
	modalHeading="QR Code"
	primaryButtonText="Close"
	secondaryButtonText=""
	passiveModal={false}
	on:click:button--secondary={() => (qrOpen = false)}
	on:open
	on:close
	on:submit={() => {
		qrOpen = false;
	}}
	size="sm"
>
	<div class="flex flex-row justify-center">
		<QRCode codeValue={link} squareSize="200" />
	</div>
</Modal>

<!-- Delete Test Modal  -->
<Modal
	bind:open={deleteOpen}
	modalHeading="Delete {toDelete?.title}"
	primaryButtonText="Confirm & Delete"
	secondaryButtonText="Close"
	passiveModal={false}
	on:click:button--secondary={() => (deleteOpen = false)}
	on:open
	on:close
	on:submit={() => {
		deleteTest(toDelete?.fireID);
	}}
	size="sm"
>
	<div class="text-center">
		<h4 class="font-semibold">Are you sure you want to Delete this Test?</h4>
		<p class="text-red-500 pad-right">This action cannot be undone</p>
	</div>
</Modal>
