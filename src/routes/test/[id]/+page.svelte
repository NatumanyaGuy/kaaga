<script>
	// @ts-nocheck
	import { db } from '$lib/firebaseConfig';
	import { toast } from '$lib/Toaster/toastStore';
	import { collection, addDoc } from 'firebase/firestore';

	Array.prototype.insert = function (index, ...items) {
		this.splice(index, 0, ...items);
	};
	import SortableList from 'svelte-sortable-list';
	import Phone from '$lib/Devices/Phone.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let show = false;
	let details = false;
	onMount(() => {});

	import {
		ClickableTile,
		ToastNotification,
		Tile,
		OverflowMenu,
		OverflowMenuItem,
		SelectableTile,
		NumberInput,
		TextInput,
		Select,
		SelectItem,
		Toggle,
		Modal,
		Button,
		TileGroup,
		RadioTile,
		TextArea,
		Tag,
		Slider,
		ContextMenu,
		ContextMenuDivider,
		ContextMenuGroup,
		ContextMenuOption,
		ContextMenuRadioGroup
	} from 'carbon-components-svelte';

	export let data;
	//Default
	let test = data;

	async function deploy() {
		//Generate response template - based on compulsories
		test.content.forEach((x) => {
			if (x.compulsory == true) {
				test.response[`${x.variable}`] = '';
			}
		});
		console.log(test);
		const docRef = await addDoc(collection(db, 'tests'), {
			title: test.title,
			desc: test.desc,
			id: test.id.toLowerCase() + '_' + uid().substring(3, 9),
			content: test.content,
			response: test.response,
			date: new Date().toDateString(),
			creator: 'guy_natumanya',
			status: 'In-Progress'
		});
		console.log('Document written with ID: ', docRef.id);
		toast('Successfully deployed!', 'success');
		home.click();
	}

	import HelperText from '$lib/BuilderResources/HelperText.svelte';
	import Label from '$lib/BuilderResources/Label.svelte';
	import Variable from '$lib/BuilderResources/Variable.svelte';
	import Text from '$lib/BuilderResources/Text.svelte';
	import ListText from '$lib/BuilderResources/ListText.svelte';
	import Compulsory from '$lib/BuilderResources/Compulsory.svelte';
	import {
		Add,
		TrashCan,
		TextBold,
		TextItalic,
		TextUnderline,
		ChevronLeft,
		TextAlignLeft,
		TextAlignCenter,
		TextAlignRight,
		FetchUploadCloud,
		InformationSquareFilled
	} from 'carbon-icons-svelte';
	import Icon from '$lib/BuilderResources/Icon.svelte';

	let open = false; //Handles Modal
	let modalPage = 1; //Handles modal pages
	let toAdd = {}; //Handles component to add

	let newContent = 'new'; //new | editing | inserting
	let where = 0; //Where to insert

	//Random ID generator
	import { uid } from '$lib/JS/custom.js';

	//Edit
	function replaceAt(array, index, value) {
		const ret = array.slice(0);
		ret[index] = value;
		return ret;
	}
	function addContent() {
		console.log(newContent);

		if (newContent == 'insert_above') {
			console.log(where);

			test.content.insert(where, toAdd);
		} else if (newContent == 'insert_below') {
			console.log(where);

			// test.content.splice(where + 1, 0, toAdd);
			test.content.insert(where + 1, toAdd);
		} else if (newContent == 'new') {
			test.content = [...test.content, toAdd];
		} else if (newContent == 'editing') {
			var ind = test.content.findIndex((x) => {
				return toAdd.id == x.id;
			});
			replaceAt(test.content, ind, toAdd);
		}
		test = test;
		open = false;
		// console.log(test.content);
	}
	let home;
</script>

<a href="/" class="hidden" bind:this={home}>home</a>

{#if show == false}
	<Tile>
		<h3>Create a new Test</h3>
		<div class="grid grid-cols-2 gap-6 mt-3">
			<div>
				<TextInput light={false} bind:value={test.title} labelText="" placeholder="Test Title" />
				<br />
				<TextInput
					light={false}
					on:keyup={() => {
						test.id = test.id.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
					}}
					bind:value={test.id}
					helperText="Please use letters and numbers only"
					labelText=""
					placeholder="Test ID"
				/>
			</div>

			<TextArea light={false} bind:value={test.desc} labelText="" placeholder="Test Description" />
		</div>
		<div class="flex flex-row justify-end mt-3">
			<Button
				on:click={() => {
					if (test.title == '') {
						toast('Please enter a Title for your test', 'error');
					} else if (test.id == '') {
						toast('Please enter an ID for your test', 'error');
					} else if (test.desc == '') {
						toast('Please enter a Description for your test', 'error');
					} else {
						show = true;
					}
				}}>Continue</Button
			>
		</div>
	</Tile>
{:else}
	<div class="flex flex-row justify-start  -mt-8">
		<Button
			class=""
			kind="secondary"
			icon={InformationSquareFilled}
			on:click={() => {
				details = true;
			}}>TEST DETAILS</Button
		>
		<Button
			class=""
			icon={FetchUploadCloud}
			on:click={() => {
				deploy();
			}}>Deploy</Button
		>
	</div>

	<div class="flex flex-row gap-2">
		<div class="basis-3/5 ">
			<div class="bx--tile w-full mx-auto -space-y-1">
				{#each test.content as c, i}
					<Tile light>
						<div class="flex flex-row gap-2">
							<div class="basis-11/12">
								{#if c.type == 'Paragraph'}
									<!-- Paragraph  -->
									<p
										in:fade
										class="pad-right 
								{c.bold == true ? 'font-bold' : ''}
								{c.italic == true ? 'italic' : ''}
								{c.underline == true ? 'underline underline-offset-3' : ''}
								{c.align == 'left' ? 'text-left' : ''}
								{c.align == 'center' ? 'text-center' : ''}
								{c.align == 'right' ? 'text-right' : ''}
								"
									>
										{c.text}
									</p>
									<!-- Heading  -->
								{:else if c.type == 'Heading'}
									<h3
										in:fade
										class="pad-right 
							{c.bold == true ? 'font-bold' : ''}
							{c.italic == true ? 'italic' : ''}
							{c.underline == true ? 'underline underline-offset-3' : ''}
							{c.align == 'left' ? 'text-left' : ''}
							{c.align == 'center' ? 'text-center' : ''}
							{c.align == 'right' ? 'text-right' : ''}
							"
									>
										{c.text}
									</h3>
									<!-- Line Break  -->
								{:else if c.type == 'Line Break'}
									<p class="" in:fade />
									<!-- Horizontal Line  -->
								{:else if c.type == 'Horizontal Line'}
									<hr class="" in:fade />
									<!-- List  -->
								{:else if c.type == 'List'}
									<ol in:fade>
										{#each c.listItems.split(/\r?\n/) as item, i}
											<li>{@html c.listType == 'ordered' ? i + 1 + '. ' : '&#x2022;'} {item}</li>
										{/each}
									</ol>
									<!-- Dropdown Select  -->
								{:else if c.type == 'Dropdown Select'}
									<div in:fade>
										<p class="pad-right font-semibold">{c.label}</p>
										<Select labelText="">
											{#each c.options as option}
												<SelectItem value={option.text} />
											{/each}
										</Select>
										<p class="pad-right font-light text-sm text-end">{c.HelperText}</p>
									</div>

									<!-- Single Select  -->
								{:else if c.type == 'Single Select'}
									<div in:fade>
										<p class="pad-right font-semibold">{c.label}</p>
										<TileGroup legend="">
											{#each c.options as option}
												<RadioTile value={option.text}>{option.text}</RadioTile>
											{/each}
										</TileGroup>
										<p class="pad-right font-light text-sm">{c.HelperText}</p>
									</div>
									<!-- Multiple Select  -->
								{:else if c.type == 'Multiple Select'}
									<div in:fade>
										<p class="pad-right font-semibold">{c.label}</p>
										<TileGroup legend="">
											{#each c.options as option}
												<SelectableTile value={option.text}>{option.text}</SelectableTile>
											{/each}
										</TileGroup>
										<p class="pad-right font-light text-sm">{c.HelperText}</p>
									</div>
									<!-- Text Input  -->
								{:else if c.type == 'Text Input'}
									<div in:fade>
										<TextInput
											labelText={c.label}
											placeholder={c.placeholder}
											helperText={c.HelperText}
										/>
										<br />
									</div>
									<!-- Number Input  -->
								{:else if c.type == 'Number Input'}
									<div in:fade>
										<NumberInput
											value="0"
											label={c.label}
											placeholder={c.placeholder}
											helperText={c.HelperText}
										/>
										<br />
									</div>
									<!-- Textarea Input  -->
								{:else if c.type == 'Textarea Input'}
									<div in:fade>
										<TextArea
											labelText={c.label}
											placeholder={c.placeholder}
											helperText={c.HelperText}
										/>
										<br />
									</div>
									<!-- Ranking Input  -->
								{:else if c.type == 'Ranking'}
									<div in:fade>
										<SortableList
											list={c.options}
											key="id"
											let:index
											on:sort={(ev) => {
												c.options = ev.detail;
											}}
											let:item
										>
											<Tile>
												<div class="flex flex-row">
													<div class="basis-1/12">
														<Tag type="outline" size="sm">{index + 1}</Tag>
													</div>
													<h5 class="text-center basis-11/12">{item.text}</h5>
												</div>
											</Tile>
										</SortableList>
										<br />
									</div>
									<!-- Range - Slider  -->
								{:else if c.type == 'Range Select'}
									<div in:fade>
										<Slider fullWidth labelText={c.label} min={c.min} max={c.max} />
										<small class="pad-right font-light" style="font-size:11px;"
											>{c.HelperText}</small
										>
										<br />
									</div>
								{/if}
							</div>

							<OverflowMenu class="basis-1/12">
								{#if c.type == 'Paragraph' || c.type == 'Heading'}
									<OverflowMenuItem primaryFocus="false" class="">
										<div class="grid grid-cols-3 gap-2">
											<Button
												kind={c.bold == true ? 'secondary' : 'ghost'}
												size="sm"
												icon={TextBold}
												iconDescription="Bold"
												on:click={() => (c.bold = !c.bold)}
											/>
											<Button
												kind={c.italic == true ? 'secondary' : 'ghost'}
												size="sm"
												icon={TextItalic}
												iconDescription="Italic"
												on:click={() => (c.italic = !c.italic)}
											/>
											<Button
												kind={c.underline == true ? 'secondary' : 'ghost'}
												size="sm"
												icon={TextUnderline}
												iconDescription="Underline"
												on:click={() => (c.underline = !c.underline)}
											/>
										</div>
									</OverflowMenuItem>
									<OverflowMenuItem primaryFocus={false} class="flex flex-row justify-center">
										<div class="grid grid-cols-3 gap-2">
											<Button
												isSelected={c.align == 'left'}
												kind={c.align == 'left' ? 'secondary' : 'ghost'}
												size="sm"
												iconDescription="Align Left"
												icon={TextAlignLeft}
												on:click={() => (c.align = 'left')}
											/>
											<Button
												isSelected={c.align == 'center'}
												kind={c.align == 'center' ? 'secondary' : 'ghost'}
												size="sm"
												iconDescription="Align Center"
												icon={TextAlignCenter}
												on:click={() => (c.align = 'center')}
											/>
											<Button
												isSelected={c.align == 'right'}
												kind={c.align == 'right' ? 'secondary' : 'ghost'}
												size="sm"
												iconDescription="Align Right"
												icon={TextAlignRight}
												on:click={() => (c.align = 'right')}
											/>
										</div>
									</OverflowMenuItem>
								{/if}

								{#if c.type !== 'Line Break' && c.type !== 'Horizontal Line'}
									<OverflowMenuItem
										text="Edit"
										on:click={() => {
											modalPage = 2;
											newContent = 'editing';
											toAdd = c;
											open = true;
											// console.log(c.type);
										}}
									/>
								{/if}

								<OverflowMenuItem
									text="Insert Above"
									on:click={() => {
										// console.log(c.type);
										where = i;
										newContent = 'insert_above';
										modalPage = 1;
										open = true;
									}}
								/>
								<OverflowMenuItem
									text="Insert Below"
									on:click={() => {
										// console.log(c.type);
										where = i;
										newContent = 'insert_below';
										modalPage = 1;
										open = true;
									}}
								/>

								<OverflowMenuItem
									text="Delete"
									danger
									on:click={() => {
										test.content = test.content.filter((x) => {
											return x.id !== c.id;
										});
									}}
								/>
							</OverflowMenu>
						</div>
					</Tile>
				{/each}

				<div class="flex flex-row justify-center my-2">
					<!-- ['Paragraph', 'Heading', 'Line Break', 'Radio', 'Text Input', 'Number Input', 'Sort', 'Select']  -->
					<Button
						kind="primary-tertiary"
						iconDescription="Add"
						icon={Add}
						on:click={() => {
							newContent = 'new';
							modalPage = 1;
							open = true;
						}}
					/>
				</div>
			</div>
		</div>

		<!-- Device  -->

		<div class="basis-2/5 -mt-6">
			<div class="hidden lg:block md:block relative">
				<Phone data={test} />
			</div>
		</div>
	</div>
{/if}

<!-- Add Modal  -->
<Modal bind:open size="lg" passiveModal modalHeading="" class="overflow-x-hidden">
	{#if modalPage == 1}
		<div class="grid grid-cols-5 gap-3" in:fade>
			{#each ['Paragraph', 'Heading', 'List', 'Line Break', 'Horizontal Line', 'Text Input', 'Number Input', 'Textarea Input', 'Dropdown Select', 'Single Select', 'Multiple Select', 'Ranking', 'Range Select', 'Image'] as type}
				<ClickableTile
					light
					on:click={() => {
						//Paragraph, Heading
						if (type == 'Paragraph' || type == 'Heading') {
							toAdd = {
								type: type,
								text: '',
								id: uid(),
								centered: false,
								italic: false,
								bold: false,
								align: 'left'
							};
							modalPage = 2;
							//List
						} else if (type == 'List') {
							toAdd = { type: 'List', listItems: '', id: uid(), listType: 'ordered' };
							modalPage = 2;

							//Text Input, Number, Textarea Input
						} else if (type == 'Text Input' || type == 'Number Input' || type == 'Textarea Input') {
							toAdd = {
								type: type,
								label: '',
								variable: '',
								placeholder: '',
								HelperText: '',
								compulsory: true,
								id: uid()
							};
							modalPage = 2;
							//Line Break , Horizontal Line
						} else if (type == 'Line Break' || type == 'Horizontal Line') {
							toAdd = { type: type, id: uid() };
							test.content = [...test.content, toAdd];
							open = false;
							//Single, Multiple Select, Ranking
						} else if (
							type == 'Dropdown Select' ||
							type == 'Single Select' ||
							type == 'Multiple Select' ||
							type == 'Ranking'
						) {
							toAdd = {
								type: type,
								HelperText: '',
								reponse: '',
								variable: '',
								label: '',
								compulsory: true,
								options: [],
								id: uid()
							};
							modalPage = 2;
						} else if (type == 'Range Select') {
							toAdd = {
								type: type,
								label: '',
								variable: '',
								placeholder: '',
								HelperText: '',
								min: 0,
								max: 100,
								compulsory: true,
								id: uid()
							};
							modalPage = 2;
						}
					}}
				>
					<div class="flex flex-row justify-center">
						<Icon {type} />
					</div>
					<p class="text-center pad-right">{type}</p>
				</ClickableTile>
			{/each}
		</div>
	{:else if modalPage == 2}
		<div class={newContent == 'editing' ? 'hidden' : ''}>
			<Button
				kind="ghost"
				icon={ChevronLeft}
				iconDescription="BACK"
				on:click={() => {
					toAdd = {};
					modalPage = 1;
				}}
			/>
		</div>

		<!-- Text Input, Number, Textarea Input  -->
		{#if toAdd.type == 'Text Input' || toAdd.type == 'Number Input' || toAdd.type == 'Textarea Input'}
			<Tile light>
				<Compulsory bind:compulsory={toAdd.compulsory} />
				<Variable bind:variable={toAdd.variable} />
				<Label bind:label={toAdd.label} />
				<HelperText bind:helpertext={toAdd.HelperText} />
			</Tile>
			<!-- Paragraph & Heading  -->
		{:else if toAdd.type == 'Paragraph' || toAdd.type == 'Heading'}
			<!-- Paragraph  -->
			<Tile>
				<Text type={toAdd.type} bind:text={toAdd.text} />
			</Tile>
			<!-- List  -->
		{:else if toAdd.type == 'List'}
			<!-- List  -->
			<div class="mb-2">
				<Toggle
					labelText=""
					on:toggle={(e) => {
						// console.log(e.detail.toggled);
						if (e.detail.toggled == false) {
							toAdd.listType = 'ordered';
						} else {
							toAdd.listType = 'bullet';
						}
					}}
				>
					<span slot="labelA">Ordered List</span>
					<span slot="labelB">Bullet List</span>
				</Toggle>
			</div>
			<ListText bind:listText={toAdd.listItems} />
			<!-- Single, Multiple & Ranking  -->
		{:else if toAdd.type == 'Dropdown Select' || toAdd.type == 'Single Select' || toAdd.type == 'Multiple Select' || toAdd.type == 'Ranking'}
			<div class="flex flex-row gap-2">
				<div class="basis-1/2">
					<Tile light class="space-y-5">
						<Compulsory bind:compulsory={toAdd.compulsory} />
						<Variable bind:variable={toAdd.variable} />
						<Label bind:label={toAdd.label} />
						<HelperText bind:helpertext={toAdd.HelperText} />
					</Tile>
				</div>

				<div class="basis-1/2">
					<Tile light class="space-y-0.5">
						<h5 class="text-center pr-0">Options you're giving</h5>
						{#each toAdd.options as option, i}
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
										toAdd.options = toAdd.options.filter((x) => {
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
									toAdd.options = [...toAdd.options, { text: '', id: uid() }];
								}}>New Option</Button
							>
						</div>
					</Tile>
				</div>
			</div>
		{:else if toAdd.type == 'Range Select'}
			<Tile light>
				<div class="grid grid-cols-2 gap-4">
					<Compulsory bind:compulsory={toAdd.compulsory} />

					<div class="flex flex-row gap-3 mt-5">
						<NumberInput label="Minimum Value" bind:value={toAdd.min} />
						<NumberInput label="Maximum Value" bind:value={toAdd.max} />
					</div>
				</div>
				<Variable bind:variable={toAdd.variable} />
				<Label bind:label={toAdd.label} />
				<HelperText bind:helpertext={toAdd.HelperText} />
			</Tile>
		{:else if toAdd.type == 'Image'}
			<Tile light>
				<p>Image Upload</p>
			</Tile>
		{/if}

		<div class="flex flex-row justify-end mt-5">
			<Button
				on:click={() => {
					//Validate - Check for variable & label & options & min, max
					if (toAdd.variable == '') {
						toast('Please enter a Variable for this Question', 'error');
					} else if (toAdd.label == '') {
						toast('Please enter a Label for this Question', 'error');
					} else if (toAdd.options?.length <= 1) {
						toast('Please two or more selection options for this Question', 'error');
					} else if (
						toAdd.options
							?.map((x) => {
								return x.text == '';
							})
							.includes(true) == true
					) {
						toast("Looks like there's an empty option, please check again!", 'error');
					} else if (toAdd.min === '') {
						toast('Please enter the minimum value', 'error');
					} else if (toAdd.max === '') {
						toast('Please enter the maximum value', 'error');
					} else {
						//PASS
						addContent();
					}
				}}
				kind="secondary">FINISH</Button
			>
		</div>
	{/if}
</Modal>

<!-- Details Modal  -->
<Modal
	bind:open={details}
	size="lg"
	passiveModal
	modalHeading="Test Details"
	primaryButtonText="Finish"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (details = false)}
	on:open
	on:close
	on:submit
>
	<div class="grid grid-cols-2 gap-6">
		<div>
			<TextInput light={false} bind:value={test.title} labelText="" placeholder="Test Title" />
			<br />
			<TextInput
				light={false}
				on:keyup={() => {
					test.id = test.id.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
				}}
				bind:value={test.id}
				helperText="Please use letters and numbers only"
				labelText=""
				placeholder="Test ID"
			/>
		</div>

		<TextArea light={false} bind:value={test.desc} labelText="" placeholder="Test Description" />
	</div>
</Modal>
