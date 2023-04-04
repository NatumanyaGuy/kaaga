<script>
	// @ts-nocheck
	import '../app.css';
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { kaaga_user } from '$lib/Stores/localStore.js';
	import { toast } from '$lib/Toaster/toastStore';
	import { navigating } from '$app/stores';

	let firstLoading = true;

	//Check account session - expires after 3 days
	onMount(() => {
		firstLoading = true;
		const diffTime = Math.abs(new Date($kaaga_user.date) - new Date());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		// console.log(diffDays + ' days');

		if (diffDays >= 3) {
			// firstLoading = true;
			signUserOut();
			toast('Please sign in again. Your session has expired', 'warning');
			// firstLoading = false;
		}

		setTimeout(() => {
			firstLoading = false;
		}, 1000);
	});

	//Carbon Components
	import { ProgressBar, Loading, Content, Row, Column } from 'carbon-components-svelte';

	//Toaster
	import Toast from '$lib/Toaster/Toast.svelte';

	//Auth
	let loading = false; //Watch loading
	import { auth, db } from '$lib/firebaseConfig.js';
	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import NavBar from '$lib/UI/NavBar.svelte';
	import GoogleBtn from '$lib/UI/GoogleBtn.svelte';
	import { fade } from 'svelte/transition';
	import SocialBtns from '$lib/UI/SocialBtns.svelte';
	import AppleBtn from '$lib/UI/AppleBtn.svelte';

	//Create new user
	async function createUser(email, username, photoURL) {
		await setDoc(doc(db, 'admin', email), {
			username,
			email,
			photoURL,
			joinDate: new Date().toLocaleDateString()
		})
			.then(() => {
				$kaaga_user.username = username;
				$kaaga_user.email = email;
				$kaaga_user.photoURL = photoURL;
				$kaaga_user.date = new Date();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	//check if user in db else read
	async function checkUser(email, username, photoURL) {
		const docRef = doc(db, 'admin', email);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// console.log('Document data:', docSnap.data());
			$kaaga_user.username = docSnap.data().username;
			$kaaga_user.email = docSnap.data().email;
			$kaaga_user.photoURL = docSnap.data().photoURL;
			$kaaga_user.joinDate = docSnap.data().joinDate;
			$kaaga_user.date = new Date();
		} else {
			// doc.data() will be undefined in this case
			createUser(email, username, photoURL);
			//	Create User
		}
	}

	//Sign In function
	async function signIn() {
		loading = true;
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				checkUser(user.email, user.displayName, user.photoURL)
					.then(() => {
						console.log('success');
					})
					.catch((e) => {
						console.log(e);
					});
				loading = false;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				console.log(errorCode, errorMessage);
				loading = false;
			});
	}

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

	//Background Auth
</script>

<Toast />

<!-- Loading thingy ath the bottom  -->
{#if $navigating}
	<div transition:fade>
		<ProgressBar size="md" helperText="" class="bottom-0 fixed w-screen" />
	</div>
{/if}
<!-- Loading thingy end -->

{#if firstLoading}
	<!-- First Loading to Cover whether Authenticated or not -->
	<div class="flex flex-row justify-center items-center h-screen">
		<img src="/favicon.png" class="w-24 h-auto animate-pulse" alt="" />
	</div>
{:else if $kaaga_user?.username.length > 0}
	<div in:fade>
		<!-- Header and Nav Bar  -->
		<NavBar />
		<!-- Header and Navbar end  -->

		<!-- Slot Content  -->
		<Content>
			<Row>
				<Column>
					<slot />
				</Column>
			</Row>
		</Content>
		<!-- Slot Content End -->
	</div>
{:else}
	<!-- Sign In page  -->

	<div class="flex flex-flex-row gap-2 h-[100vh]">
		<div
			class="basis-3/5 background-animate bg-gradient-to-r from-[#6e3bf7] to-[#582ec5] text-white 
			shadow-lg px-5 py-10 text-center hidden lg:block md:block"
		>
			<div class="flex flex-col justify-center items-center h-full max-w-md mx-auto">
				<img src="/favicon.png" class="w-24 h-auto mx-auto" alt="" />
				<h4 class="my-3 font-bold text-4xl">Digito Sensory Evaluation.</h4>
				<p class="text-xl text-justify">
					Kaaga is helping product developers create and deploy digital questionnaires online.
					<br />
					Get real-time responses from testers, gain insights into the sensory properties of your products.
				</p>
			</div>
		</div>

		<div class="basis-full lg:basis-2/5 md:basis-2/5">
			<div class="flex flex-col justify-center items-center h-[90%]">
				<img src="/favicon.png" class="w-24 h-auto mx-auto mb-8 lg:hidden md:hidden" alt="" />

				<div class="flex flex-row gap-4">
					<GoogleBtn
						on:click={() => {
							signIn();
						}}
					/>
					<AppleBtn
						on:click={() => {
							toast(
								'Sign in with Apple still under development. \nPlease use your Google Account instead.',
								'warning'
							);
						}}
					/>
				</div>
			</div>

			<hr class="w-3/4 mx-auto" />
			<p class="text-center font-light">
				Copyright <a href="https://muriro.com" target="_blank">Muriro</a>, 2023
			</p>
		</div>
	</div>

	<!-- Sign In page end  -->
{/if}

<!-- Loading Overlay  -->
{#if loading}
	<Loading />
{/if}

<!-- Loading Overlay end  -->
<style>
	.background-animate {
		background-size: 400%;

		-webkit-animation: AnimationName 5s ease infinite;
		-moz-animation: AnimationName 5s ease infinite;
		animation: AnimationName 5s ease infinite;
	}

	@keyframes AnimationName {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
