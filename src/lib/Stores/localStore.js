import { persisted } from 'svelte-local-storage-store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const kaaga_user = persisted('kaaga_user', {
	username: '',
	useremail: '',
	photoURL: '',
	date: '',
	tests: '...'
});
