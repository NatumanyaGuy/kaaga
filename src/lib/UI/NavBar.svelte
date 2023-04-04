<script>
	// @ts-nocheck
	import { kaaga_user } from '$lib/Stores/localStore.js';

	//Carbon Components
	import {
		Header,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelDivider,
		Tag,
		HeaderPanelLink,
		SideNav,
		SideNavItems,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Theme,
		Button,
		Modal
	} from 'carbon-components-svelte';

	//URL params
	import { page } from '$app/stores';

	//Icons
	import {
		Home,
		DocumentAdd,
		Document,
		Box,
		Close,
		AirlinePassengerCare,
		UserAvatarFilledAlt,
		ColorPalette
	} from 'carbon-icons-svelte';

	//Nav & Sidebar Logic
	let userOpen = false;
	let themeOpen = false;
	let isSideNavOpen = false;

	//Theme watcher
	let theme = 'g100';

	//Auth

	import { auth } from '$lib/firebaseConfig.js';
	import { signOut } from 'firebase/auth';
	import SocialBtns from './SocialBtns.svelte';

	//Sign Out function
	async function signUserOut() {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				$kaaga_user.username = '';
				$kaaga_user.email = '';
				$kaaga_user.photoURL = '';
				$kaaga_user.joinDate = '';
				$kaaga_user.date = '';
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	}

	//Contact Modal
	let open = false;
</script>

<Theme
	bind:theme
	persist
	persistKey="__carbon-theme"
	tokens={{
		'interactive-01': '#582ec5',
		'interactive-03': '#582ec5',
		'interactive-04': '#582ec5',
		'hover-primary': '#6e3bf7',
		'active-primary': '#9f1853'
	}}
/>

<Header company="Kaaga" platformName="" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>

	<HeaderUtilities>
		<!-- <Button href="/NewTest" kind="ghost" icon={DocumentAdd}>New Test</Button> -->

		<HeaderAction bind:isOpen={themeOpen} icon={ColorPalette} closeIcon={Close}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Change Appearence</HeaderPanelDivider>
				{#each ['white', 'g10', 'g80', 'g90', 'g100'] as t}
					<HeaderPanelLink
						on:click={() => {
							theme = t;
						}}>{t}</HeaderPanelLink
					>
				{/each}
			</HeaderPanelLinks>
		</HeaderAction>

		<HeaderAction bind:isOpen={userOpen} icon={UserAvatarFilledAlt} closeIcon={Close}>
			<!-- User Profile  -->
			<div class="flex flex-row justify-center mt-7 mb-3">
				<img src={$kaaga_user.photoURL} class="w-24 rounded-full shadow-lg" alt="Avatar" />
			</div>
			<h5 class="text-center">{$kaaga_user.username}</h5>

			<div class="flex flex-row justify-center">
				<Tag>{$kaaga_user.email}</Tag>
			</div>

			<div class="flex flex-row justify-center mt-6">
				<Button
					class="text-center"
					on:click={() => {
						signUserOut();
					}}>SIGN OUT</Button
				>
			</div>

			<HeaderPanelDivider />
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
	<SideNavItems>
		<SideNavLink icon={Home} text="Dashboard" href="/" isSelected={$page.url.pathname == '/'} />
		<SideNavLink
			icon={Document}
			text="New Test"
			href="/create"
			isSelected={$page.url.pathname == '/create'}
		/>

		<SideNavLink
			icon={DocumentAdd}
			text="Tests"
			href="/tests"
			isSelected={$page.url.pathname == '/tests'}
		/>
		<!-- <SideNavLink
    icon={PassengerPlus}
    text="Pannelists"
    href="/pannelists"
    isSelected={$page.url.pathname == '/pannelists'}
/> -->
		<SideNavLink icon={Box} text="Documentation" href="/documentation" />
		<!-- <SideNavLink icon={Settings} text="Settings" href="/settings" /> -->
		<SideNavDivider />
		<SideNavLink
			icon={AirlinePassengerCare}
			text="Contact Us"
			on:click={() => {
				open = true;
			}}
		/>
	</SideNavItems>
</SideNav>

<Modal passiveModal size="lg" bind:open modalHeading="Contact Us" on:open on:close>
	<SocialBtns size="w-12 h-12" />
</Modal>
