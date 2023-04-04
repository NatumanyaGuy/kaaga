<script>
	// @ts-nocheck
	import { db } from '$lib/firebaseConfig';
	import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
	import { kaaga_user } from '$lib/Stores/localStore.js';
	import HelperText from '$lib/BuilderResources/HelperText.svelte';
	import Label from '$lib/BuilderResources/Label.svelte';
	import Variable from '$lib/BuilderResources/Variable.svelte';
	import Compulsory from '$lib/BuilderResources/Compulsory.svelte';
	import { toast } from '$lib/Toaster/toastStore';
	import Form from '$lib/BuilderResources/Form.svelte';
	import { items } from './create.js';
	import {
		Button,
		Tile,
		TextInput,
		NumberInput,
		ContentSwitcher,
		OverflowMenu,
		ToastNotification,
		OverflowMenuItem,
		Tag,
		ClickableTile,
		FileUploader,
		Dropdown,
		Switch,
		Modal,
		Loading,
		Breadcrumb,
		BreadcrumbItem
	} from 'carbon-components-svelte';
	import { Add, TrashCan, Filter } from 'carbon-icons-svelte';
	import DeviceSelection from '$lib/BuilderResources/DeviceSelection.svelte';
	import { uid } from '$lib/JS/custom.js';
	import Source from './Source.svelte';
	import Destination from './Destination.svelte';
	import RichTextEditor from '$lib/BuilderResources/RichTextEditor.svelte';
	// import Welcome from './Welcome.svelte';

	// export let data;
	//Default
	let device = 'w-5/12';
	let addWhere = 'welcome';
	let loading = false;
	let tab = 0;
	let open = false;
	// let content[addWhere][content.findIndex(x => x.id === active?.id)];
	let active = {};
	$: activeID = content[addWhere].findIndex((x) => x.id === active?.id);

	let content = {
		title: '',
		description: '',
		id: '',
		welcome: [
			{
				name: 'Line Break',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Line Break',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Line Break',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Line Break',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<h1 class="ql-align-center"><strong>Welcome</strong></h1><p class="ql-align-center">Thank you for taking time to participate in this study. Please click continue to get started.</p>',
					text: 'Welcome\nThank you for taking time to participate in this study. Please click continue to get started.\n'
				}
			}
		],
		test: [],
		farewell: [
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p class="ql-align-center"><strong>Thank you for your response</strong></p>',
					text: 'Thank you for your response\n'
				}
			}
		],
		response: {},
		creator: $kaaga_user.username,
		date: new Date().toDateString()
	}; //Page 2 (Questions) Content

	let activeScreen = 0;
	let home;

	async function deploy() {
		loading = true;
		//Create responses
		content.test.forEach((x) => {
			if (x.compulsory == true) {
				content.response[`${x.variable}`] = '';
			}
		});

		//Upload Test
		const docRef = await addDoc(collection(db, 'tests'), {
			title: content.title,
			description: content.description,
			id: content.id,
			welcome: content.welcome,
			test: content.test,
			farewell: content.farewell,
			response: content.response,
			creator: $kaaga_user.email,
			date: new Date(),
			responses: []
		})
			.then(() => {
				console.log('success');
				loading = false;
				home.click();
				toast('Success. Test published!', 'success');
			})
			.catch((e) => {
				console.log(e, 'There was an error!');
				toast('There was an error publishing your test!', 'error');
				loading = false;
			});
	}

	let s = 1;
	let detailsOpen = false;
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	//On mount check if tests more than 3 for user email
	onMount(() => {});

	//Check if ID is in use
	async function checkID(i) {
		let l = 0;
		const q = query(collection(db, 'tests'), where('id', '==', i));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			l++;
		});
		return l;
	}

	//Drawer - Opens templates
	import Drawer from 'svelte-drawer-component';
	let openDrawer = false;

	//Test filter
	import { filtered, term } from '$lib/Stores/templates.js';
	function filterBy(t) {
		if (t == 'Show All') {
			term.set('');
		} else {
			term.set(t);
		}
	}
</script>

<svelte:head>
	<title>Kaaga – {content.title == '' ? 'New Test' : content.title}</title>
</svelte:head>

<a href="/" bind:this={home} class="hidden">home</a>

{#if loading == true}
	<div in:fade>
		<Loading />
	</div>
{/if}

{#if s == 1}
	<div class="flex flex-row justify-end mb-5">
		<div>
			<Breadcrumb noTrailingSlash>
				<BreadcrumbItem href="/">Kaaga</BreadcrumbItem>
				<BreadcrumbItem href="/create" isCurrentPage>New Test</BreadcrumbItem>
			</Breadcrumb>
		</div>
	</div>

	{#if $kaaga_user.tests >= 3}
		<ToastNotification
			fullWidth
			kind="warning-alt"
			hideCloseButton
			title="You've exceeded your monthly Test quota!"
			subtitle="Kaaga is still a work in progress and we can only support up to 3 tests per user per month."
			caption="Please bare with us as we continue to improve the platform."
		/>
		<br />
	{/if}

	<Tile>
		<h3>Create a new Test</h3>
		<Form
			bind:id={content.id}
			bind:description={content.description}
			bind:title={content.title}
			disabled={$kaaga_user.tests >= 3}
			src="main"
		/>
		<div class="flex flex-row justify-end mt-3">
			<Button
				on:click={async () => {
					if (content.title == '') {
						toast('Please enter a Title for your test', 'error');
					} else if (content.id == '') {
						toast('Please enter an ID for your test', 'error');
					} else if (content.description == '') {
						toast('Please enter a Description for your test', 'error');
					} else {
						openDrawer = true;
						content.id = content.id + '-' + uid().substr(uid().length - 5);
						// s = 2;

						// Check if ID is used
						// if ((await checkID(content.id)) == 0) {

						// } else {
						// 	toast('This ID is already in use, please use another one', 'error');
						// }
					}
				}}>Continue</Button
			>
		</div>
	</Tile>
{:else if s == 2}
	<div class="flex flex-row gap-4" in:fade>
		<div class="basis-2/3  -mt-6">
			<!-- {content} -->
			<Destination bind:active bind:items={content[addWhere]} width={device} />
		</div>

		<div class="basis-1/3 bx--tile -mt-4 h-[90vh] overflow-y-scroll overflow-x-hidden">
			<div class="flex flex-row justify-between mb-8">
				<Button
					kind="secondary"
					on:click={() => {
						// deploy();
						console.log(content);
						detailsOpen = true;
					}}>DETAILS</Button
				>

				<Button
					on:click={() => {
						deploy();
						console.log(content);
					}}>PUBLISH</Button
				>
			</div>
			<!-- Top Buttons  -->
			<div class="flex flex-row justify-between ">
				<Dropdown
					light
					titleText=""
					selectedId="0"
					items={[
						{ id: '0', text: 'Welcome Page' },
						{ id: '1', text: 'Test Page' },
						{ id: '2', text: 'Farewell Page' }
					]}
					on:select={(e) => {
						// console.log(e.detail.selectedId);
						activeScreen = e.detail.selectedId;
						if (activeScreen == 0) {
							addWhere = 'welcome';
						} else if (activeScreen == 1) {
							addWhere = 'test';
						} else if (activeScreen == 2) {
							addWhere = 'farewell';
						}
						active = {};
					}}
				/>

				<!-- <Zoom bind:zoom />  -->
				<DeviceSelection bind:device />
				{#if active?.id !== undefined}
					<div class="flex flex-row justify-end my-1">
						<Button
							size="small"
							kind="danger"
							icon={TrashCan}
							iconDescription="Delete"
							on:click={() => {
								open = true;
							}}
						/>
					</div>
				{/if}
			</div>
			<!-- Top Buttons end  -->

			<br />

			<!-- Tabs  -->
			<ContentSwitcher selectedIndex={tab}>
				<Switch
					on:click={() => {
						tab = 0;
					}}
					selected={tab == 0}
					text="Design Blocks"
				/>
				<Switch
					on:click={() => {
						tab = 1;
					}}
					selected={tab == 1}
					text="Edit Block"
				/>
			</ContentSwitcher>
			<!-- Tabs end  -->

			{#if tab == 0}
				<!-- Deisgn Blocks  -->
				<Source {items} />
			{:else if content[addWhere].length == 0 || active?.id == undefined}
				<div class=" items-center">
					<p class="pad-right text-sm text-center my-28">
						Please select a Design Block to preview.
					</p>
				</div>
			{:else}
				<!-- Design Tab  -->

				<div class="mt-3">
					<!-- Text Input, Number, Textarea Input  -->
					{#if content[addWhere][activeID]?.name == 'Text Input' || content[addWhere][activeID]?.name == 'Number Input' || content[addWhere][activeID]?.name == 'Textarea Input'}
						<Tile light>
							<Compulsory bind:compulsory={content[addWhere][activeID].compulsory} />
							<Variable bind:variable={content[addWhere][activeID].variable} />
							<Label bind:label={content[addWhere][activeID].label} />
							<HelperText bind:helpertext={content[addWhere][activeID].HelperText} />
						</Tile>
						<!-- Text Block  -->
					{:else if content[addWhere][activeID]?.name == 'Text Block'}
						<!-- <Tile light>
						<Text type={content[addWhere][activeID]?.name} bind:text={content[addWhere][activeID].text} />
					</Tile> -->
						<RichTextEditor bind:text={content[addWhere][activeID].text} />

						<!-- Single, Multiple & Ranking  -->
					{:else if content[addWhere][activeID]?.name == 'Dropdown Select' || content[addWhere][activeID]?.name == 'Single Select' || content[addWhere][activeID]?.name == 'Multiple Select' || content[addWhere][activeID]?.name == 'Ranking'}
						<div>
							<Tile light class="space-y-1">
								<Compulsory bind:compulsory={content[addWhere][activeID].compulsory} />
								<Variable bind:variable={content[addWhere][activeID].variable} />
								<Label bind:label={content[addWhere][activeID].label} />
								<HelperText bind:helpertext={content[addWhere][activeID].HelperText} />
							</Tile>
							<Tile light class="space-y-0.5">
								<h5 class="text-center pr-0">Options you're giving</h5>
								{#each content[addWhere][activeID].options as option, i}
									<div class="flex flex-basis">
										<TextInput
											bind:value={option.text}
											class="basis-11/12"
											placeholder="Option {i + 1}"
										/>
										<Button
											kind="danger-ghost"
											tooltipPosition="left"
											tooltipAlignment="end"
											iconDescription="Delete Option"
											icon={TrashCan}
											on:click={() => {
												content[addWhere][activeID].options = content[addWhere][
													activeID
												].options.filter((x) => {
													return x.id !== option.id;
												});
											}}
										/>
									</div>
								{/each}
								<div class="flex flex-row justify-center">
									<Button
										icon={Add}
										kind="secondary"
										on:click={() => {
											content[addWhere][activeID].options = [
												...content[addWhere][activeID].options,
												{ text: '', id: uid() }
											];
										}}>New Option</Button
									>
								</div>
							</Tile>
						</div>
					{:else if content[addWhere][activeID]?.name == 'Range Select'}
						<Tile light>
							<Compulsory bind:compulsory={content[addWhere][activeID].compulsory} />

							<div class="flex flex-row gap-4">
								<NumberInput label="Minimum Value" bind:value={content[addWhere][activeID].min} />
								<NumberInput label="Maximum Value" bind:value={content[addWhere][activeID].max} />
							</div>
							<br />
							<Variable bind:variable={content[addWhere][activeID].variable} />
							<Label bind:label={content[addWhere][activeID].label} />
							<HelperText bind:helpertext={content[addWhere][activeID].HelperText} />
						</Tile>
					{:else if content[addWhere][activeID]?.name == 'Image'}
						<Tile light>
							<FileUploader
								multiple={false}
								labelTitle="Upload Your Image"
								buttonLabel="{active?.dataURL == '' ? 'Add' : 'Edit'} Image"
								labelDescription="Only Images are accepted."
								accept={['.jpg', '.jpeg', '.png', '.PNG', '.gif']}
								status="complete"
								bind:value={content[addWhere][activeID].dataURL}
								on:change={(e) => {
									let image = e.detail[0];
									// console.log(image);
									let reader = new FileReader();
									reader.readAsDataURL(image);
									reader.onload = (e) => {
										let img = e.target.result;
										// console.log(img);
										content[addWhere][activeID].dataURL = img;
									};
								}}
							/>
						</Tile>
					{/if}
				</div>
				<!-- Design Tab End -->
			{/if}
		</div>
	</div>
{/if}

<Modal
	bind:open
	modalHeading="Delete Block"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => {
		open = false;
	}}
	on:open
	on:close
	on:submit={() => {
		var filtered = content[addWhere].filter(function (el) {
			return el.id != active.id;
		});
		active = {};
		content[addWhere] = filtered;
		open = false;
	}}
>
	<p>Are you sure you want to Delete this block?</p>
</Modal>

<!-- Details Modal  -->
<Modal bind:open={detailsOpen} modalHeading={content.title} passiveModal on:open on:close size="sm">
	<Form
		bind:id={content.id}
		bind:description={content.description}
		bind:title={content.title}
		src="modal"
		disabled={false}
	/>
</Modal>

<!-- Bottom Drawer  -->
<Drawer bind:open={openDrawer} size="90vh" placement="bottom">
	<div class="flex flex-row justify-end">
		<div class="p-4 w-11/12">
			<div class="flex flex-row justify-between mb-2">
				<OverflowMenu iconDescription="Filter Tests" icon={Filter}>
					{#each ['Show All', 'Training', 'Difference', 'Affective', 'Descriptive'] as t}
						<OverflowMenuItem
							on:click={() => {
								filterBy(t);
							}}
							primaryFocus={t == $term}
							text="{t} Tests"
						/>
					{/each}
				</OverflowMenu>

				<Button kind="ghost" on:click={() => (openDrawer = false)}>Close</Button>
			</div>

			<div class="grid grid-cols-4 gap-3">
				<ClickableTile>
					<div style="height: 8rem">
						<div class="flex flex-row justify-end">
							<Tag type="outline" size="sm">Blank</Tag>
						</div>
						<p><b>Blank Template</b></p>
						<small style="font-size: 0.7rem;">Create your own template</small>
					</div>
					<Button
						size="small"
						kind="secondary"
						on:click={() => {
							s = 2;
							openDrawer = false;
						}}>Use Template</Button
					>
				</ClickableTile>

				{#each $filtered as t}
					<ClickableTile>
						<div style="height: 8rem">
							<div class="flex flex-row justify-end">
								<Tag
									type={t.t == 'Training'
										? 'teal'
										: t.t == 'Difference'
										? 'green'
										: t.t == 'Affective'
										? 'purple'
										: t.t == 'Descriptive'
										? 'magenta'
										: ''}
									size="sm">{t.t}</Tag
								>
							</div>
							<p><b>{t.n}</b></p>
							<small style="font-size: 0.7rem;">{t.s}</small>
						</div>
						<Button
							size="small"
							on:click={() => {
								content.test = t.test;

								s = 2;
								openDrawer = false;
							}}>Use Template</Button
						>
					</ClickableTile>
				{/each}
			</div>
		</div>
	</div>
</Drawer>
<!-- Bottom Drawer End -->
