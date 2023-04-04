<!-- Dashboard Page  -->
<script>
	// @ts-nocheck
	import { toast } from '$lib/Toaster/toastStore';
	import { Tile, Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { Document, OverflowMenuHorizontal, SendAltFilled } from 'carbon-icons-svelte';
	import { kaaga_user } from '$lib/Stores/localStore.js';
	import { db } from '$lib/firebaseConfig.js';
	import { collection, where, getCountFromServer, query } from 'firebase/firestore';
	import { onMount } from 'svelte';

	//Count User Tests
	async function countTests() {
		const coll = collection(db, 'tests');
		const q = query(coll, where('creator', '==', $kaaga_user.email));
		const snapshot = await getCountFromServer(q);
		// console.log('count: ', snapshot.data().count);
		return snapshot.data().count;
	}

	onMount(async () => {
		$kaaga_user.tests = await countTests();
	});
</script>

<svelte:head>
	<title>Kaaga</title>
</svelte:head>

<div class="flex flex-row justify-end mb-5">
	<div>
		<Breadcrumb noTrailingSlash>
			<BreadcrumbItem href="/">Kaaga</BreadcrumbItem>
			<BreadcrumbItem href="/" isCurrentPage>Dashboard</BreadcrumbItem>
		</Breadcrumb>
	</div>
</div>

<div class="text-start mb-8">
	<h1 class="capitalize">Hello {$kaaga_user.username.split(' ')[1]},</h1>
</div>

<div class="flex flex-col lg:flex-row md:flex-row gap-5">
	<div class="lg:basis-1/2 md:basis-1/2">
		<p>
			Kaaga is a digito sensory analysis platform that enables evaluators to create and deploy
			digital questionnaires online to testers.
			<br />
			We hope you enjoy using Kaaga. God bless!
		</p>
		<div class="grid grid-cols-2 gap-2">
			<Tile class="flex flex-row justify-between gap-2 shadow-sm cursor-pointer mt-3">
				<div
					class="h-14 w-14 p-3 rounded-full bx--tile--light items-center flex flex-row justify-center"
				>
					<Document size="32" />
				</div>
				<div>
					<p class="text-end font-light text-3xl">{$kaaga_user.tests}</p>
					<p class="text-end font-semibold text-xl">Tests deployed</p>
				</div>
			</Tile>
			<Tile class=" flex flex-row justify-between gap-2 shadow-sm cursor-pointer mt-3">
				<div
					class="h-14 w-14 p-3 rounded-full bx--tile--light items-center flex flex-row justify-center"
				>
					<SendAltFilled size="32" />
				</div>
				<div>
					<p class="text-end font-light text-3xl"><OverflowMenuHorizontal /></p>
					<p class="text-end font-semibold text-xl">Responses so far</p>
				</div>
			</Tile>
		</div>

		<div class="hidden lg:block md:block">
			<hr class="mt-10" />
			<p class="text-center ">
				Copyright. <a href="https://muriro.com" target="_blank">Muriro Inc</a>. 2023
			</p>
		</div>
	</div>

	<div class="lg:basis-1/2 md:basis-1/2">
		<iframe
			class="w-full mx-auto h-96"
			title="getting_started"
			src="https://www.youtube.com/embed/N5LJ4-Zm9gs"
		/>
	</div>
</div>
