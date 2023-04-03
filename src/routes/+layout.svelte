<script>
	// @ts-nocheck
	import '../app.css';
	// import '../devices.min.css';
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
		<img src="/favicon.png" class="w-24 h-auto" alt="" />
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
	<GoogleBtn
		on:click={() => {
			signIn();
		}}
	/>
	<!-- Sign In page end  -->
{/if}

<!-- Loading Overlay  -->
{#if loading}
	<Loading />
{/if}
<!-- Loading Overlay end  -->
