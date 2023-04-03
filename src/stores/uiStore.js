import { writable, derived } from 'svelte/store';

export const term = writable('');
export const items = writable([
	//Training Tests
	{
		n: 'Taste Identification',
		id: 'taste_identification',
		t: 'Training',
		s: 'Tester is asked to identify the tastes of different samples , e.g. Sweet, Sour, Bitter, Salty & Umami '
	},
	{
		n: 'Taste Intensity',
		id: 'taste_intensity',
		t: 'Training',
		s: 'Tester is presented with three or more samples and asked to order them in terms of intensity of a specific characteristic'
	},
	//Difference Tests
	{
		n: 'Simple - Paired Comparison',
		id: 'simple_paired_comparison',
		t: 'Difference',
		s: 'Tester is asked if there is a difference between two samples'
	},
	{
		n: 'Directional - Paired Comparison',
		id: 'directional_paired_comparison',
		t: 'Difference',
		s: 'Tester is asked which sample has more distinct attribute(s), e.g. Which sample is sweeter?'
	},
	{
		n: 'Duo-Trio',
		id: 'duo_trio',
		t: 'Difference',
		s: 'Tester is presented with three samples (A reference and two other samples); then asked to identify the sample different from the reference'
	},
	{
		n: 'Triangle',
		id: 'triangle',
		t: 'Difference',
		s: 'Tester is presented with three samples (Two are the same & one is different); then asked to identify the different sample'
	},
	//Preference / Hedonic / Affective
	{
		n: 'Paired Preference',
		id: 'paired_preference',
		t: 'Affective',
		s: 'Tester is presented with two coded samples; then asked to select the one they prefer the most'
	},
	{
		n: 'Hedonic Rating',
		id: 'hedonic_rating',
		t: 'Affective',
		s: 'Tester is presented with one or more coded samples; then asked to indicate their degree of liking of the sample(s) based on a scale.'
	},
	{
		n: 'Food Action Rating',
		id: 'food_action_rating',
		t: 'Affective',
		s: 'Tester is presented with one or more coded samples; then asked to indicate their attititude towards an action on the sample(s) based on a scale.'
	},
	{
		n: 'Preference Ranking',
		id: 'preference_ranking',
		t: 'Affective',
		s: 'Tester is presented with two or more coded samples; then asked to rank them in order of preference.'
	},
	//Descriptive
	{
		n: 'Descriptive Ranking',
		id: 'descriptive_ranking',
		t: 'Descriptive',
		s: 'Tester is presented with two or more coded samples; then asked to rank them in order of intensity of a specific attribute(s).'
	},
	{
		n: 'Descriptive Rating',
		id: 'descriptive_rating',
		t: 'Descriptive',
		s: 'Tester is presented with one sample; then asked to rate the intensity of a specific preselected attribute(s).'
	}
]);
export const filtered = derived([term, items], ([$term, $items]) =>
	$items.filter((x) => x.t.includes($term))
);
