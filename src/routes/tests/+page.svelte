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
		CopyButton
	} from 'carbon-components-svelte';
	import { kaaga_user } from '$lib/Stores/localStore.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import QRCode from '$lib/UI/QRCode.svelte';

	import { toast } from '$lib/Toaster/toastStore';
	import { db } from '$lib/firebaseConfig';
	import {
		collection,
		setDoc,
		query,
		where,
		getDocs,
		doc,
		getDoc,
		updateDoc,
		arrayUnion,
		arrayRemove
	} from 'firebase/firestore';
	import QrCode from '$lib/UI/QRCode.svelte';

	//Retrieve Function
	async function getTests() {
		rows = [];
		const testersRef = collection(db, 'tests');
		const q = query(testersRef, where('creator', '==', $kaaga_user.email));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, ' => ', doc.data());
			rows = [...rows, doc.data()];
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
						<CopyButton text="https://localhost:5137/{row.id}" feedback="Copied to clipboard" />
						<OverflowMenuItem
							text="Generate QR Code"
							on:click={() => {
								qrOpen = true;
								link = 'https://localhost:5137/' + row.id;
							}}
						/>

						<OverflowMenuItem text="View" href="/testpreview/{row.id}" />
						<!-- <OverflowMenuItem
					text="Update"
					on:click={() => {
						console.log(row.id);
					}}
				/> -->
						<OverflowMenuItem danger text="Delete" />
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
