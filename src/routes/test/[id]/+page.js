// @ts-nocheck
import { templates } from '$lib/Stores/templates.js';

export async function load({ fetch, params }) {
	let x = templates.find((x) => {
		return x.id == params.id.toUpperCase();
	});
	// console.log(x);
	return x;
}
