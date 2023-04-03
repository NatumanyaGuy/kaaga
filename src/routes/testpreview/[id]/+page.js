// @ts-nocheck
import { db } from '$lib/firebaseConfig';
import { collection, query, where, doc, getDocs } from 'firebase/firestore';
import { kaaga_user } from '$lib/Stores/localStore.js';
const testsRef = collection(db, 'tests');

//Authenticate user email and read document

/*
Query for test
Check if logged in user ID == test id creator
*/

export async function load({ fetch, params }) {
	let d;
	// console.log(params.id);
	const q = query(
		testsRef,
		// where('creator', '==', kaaga_user.email),
		where('id', '==', params.id)
	);
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		d = doc.data();
		// console.log(d);
	});
	// console.log(d);
	return d;
}
