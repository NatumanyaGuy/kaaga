<script>
	// @ts-nocheck
	import { TileGroup, RadioTile, Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { Flag, Document, Person, Locked, Information } from 'carbon-icons-svelte';

	let selected = 0;
</script>

<svelte:head>
	<title>Kaaga</title>
</svelte:head>

<div class="flex flex-row justify-end mb-5">
	<div>
		<Breadcrumb noTrailingSlash>
			<BreadcrumbItem href="/">Kaaga</BreadcrumbItem>
			<BreadcrumbItem href="/documentation" isCurrentPage>Documentation</BreadcrumbItem>
		</Breadcrumb>
	</div>
</div>

<div class="flex flex-row gap-3">
	<div class="basis-8/12">
		{#if selected == 0}
			<div>
				<h3>Getting started</h3>
				<p>
					Kaaga is a Digito Sensory evaluation service developed and maintained by <a
						href="https://www.muriro.com"
						target="_blank">Muriro Inc</a
					>. The video below gives a description on how to get started with Kaaga
				</p>
				<br />
				<iframe
					class="w-full mx-auto h-96"
					title="getting_started"
					src="https://www.youtube.com/embed/N5LJ4-Zm9gs"
				/>
			</div>
		{:else if selected == 1}
			<h3>Tests</h3>
			<p>
				With about 15 in-build Questionnaire templates, the application allows sensory professionals
				to create sensory tests that can be deployed online or printed. Test formats include
				discrimination tests, descriptive analysis, and consumer preference testing, among others.
				The application also provides the flexibility to customize test parameters such as product
				attributes, sample sizes, and randomization.
			</p>
			<p>
				The video below gives a guide on how to get started with a Blank, or Pre-built Test
				template.
			</p>
			<br />
			<iframe
				class="w-full mx-auto h-96"
				title="getting_started"
				src="https://www.youtube.com/embed/N5LJ4-Zm9gs"
			/>
		{:else if selected == 2}
			<h3>Testers</h3>
			<p>
				Kaaga has features to manage testers, including access control, scheduling, and training.
				Analysts can also use the application to monitor their performance, review their scores, and
				train them.
			</p>
			<p>
				The video below will guide you on how to create a new collection of testers for your tests.
			</p>
			<br />
			<iframe
				class="w-full mx-auto h-96"
				title="getting_started"
				src="https://www.youtube.com/embed/N5LJ4-Zm9gs"
			/>
		{:else if selected == 3}
			<h3>Privacy, Security & Safety</h3>
			<p>
				Kaaga uses a Third-Party Cloudbase System ensuring secure and safe data storage. You can
				read our <a href="/">Terms and Conditions</a> on data collection and retention
			</p>
		{:else if selected == 4}
			<h3>Kaaga</h3>
			<p>
				Kaaga - Digito Sensory Evaluation is an open source data collection platform focusing on
				sensory science and hedonics of products to promote product development, assist in market
				research and product sustainance. Kaaga is developed and maintained by <a
					href="https://www.muriro.com"
					target="_blank">Muriro Inc.</a
				>
			</p>
			<hr />
			<p class="text-center">
				Copyright. <a href="https://muriro.com" target="_blank">Muriro Inc</a> 2023
			</p>
		{/if}
	</div>

	<div class="basis-4/12">
		<TileGroup legend="" bind:selected>
			<RadioTile value="0" iconDescription="Getting Started"
				><Flag size={12} class="" /> Getting started</RadioTile
			>
			<RadioTile value="1" iconDescription="Tests"><Document size={12} class="" /> Tests</RadioTile>
			<!-- <RadioTile value="2" iconDescription="Testers"
				><Person size={12} class="" /> Testers</RadioTile
			> -->

			<RadioTile value="3" iconDescription="Privacy, Security & Safety"
				><Locked size={12} class="" /> Privacy, Security & Safety</RadioTile
			>

			<RadioTile value="4" iconDescription="About Kaaga"
				><Information size={12} class="" /> About Kaaga</RadioTile
			>
		</TileGroup>
	</div>
</div>
