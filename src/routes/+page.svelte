<!-- Dashboard Page  -->
<script>
	// @ts-nocheck
	import { toast } from '$lib/Toaster/toastStore';
	import { Tile, Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { Document } from 'carbon-icons-svelte';
	import { kaaga_user } from '$lib/Stores/localStore.js';
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

<div class="text-end mb-8">
	<h1 class="capitalize">Hello {$kaaga_user.username}</h1>
</div>

<div class="flex flex-row gap-5">
	<div class="basis-1/2">
		<p>
			Kaaga is a digital data collection platform initailly developed for Sensory Evaluation
			practice. During development, we pivoted to collection of data from different fields of study.
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
					<p class="text-end font-light text-3xl">5</p>
					<p class="text-end font-semibold text-xl">Tests deployed</p>
				</div>
			</Tile>
			<Tile class=" flex flex-row justify-between gap-2 shadow-sm cursor-pointer mt-3">
				<div
					class="h-14 w-14 p-3 rounded-full bx--tile--light items-center flex flex-row justify-center"
				>
					<Document size="32" />
				</div>
				<div>
					<p class="text-end font-light text-3xl">75</p>
					<p class="text-end font-semibold text-xl">Responses so far</p>
				</div>
			</Tile>
		</div>

		<hr class="mt-10" />
		<p class="text-center">
			Copyright. <a href="https://muriro.com" target="_blank">Muriro Inc</a>. 2023
		</p>
	</div>

	<div class="basis-1/2">
		<iframe
			class="w-full mx-auto h-96"
			title="getting_started"
			src="https://www.youtube.com/embed/tgbNymZ7vqY"
		/>
	</div>
</div>
