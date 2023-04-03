import { writable, derived } from 'svelte/store';
import { uid } from '$lib/JS/custom';

export const term = writable('');
export const items = writable([
	//Training Tests
	{
		n: 'Taste Identification',
		id: 'taste_identification',
		t: 'Training',
		s: 'Tester is asked to identify the tastes of different samples , e.g. Sweet, Sour, Bitter, Salty & Umami ',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>You are presented with 4 samples of solutions which represent the basic taste sensations of <em>sweet, sour, salt </em>and <em>bitter</em>.</p><p>Starting in any order, choose a cup, take a sip from it, hold it in your mouth for 10 seconds and note the taste.</p><p>Proceed through the other samples in a similar manner, rinsing your mouth between each.</p><p>Select the taste identified in each case below.</p>',
					text: 'You are presented with 4 samples of solutions which represent the basic taste sensations of sweet, sour, salt and bitter.\nStarting in any order, choose a cup, take a sip from it, hold it in your mouth for 10 seconds and note the taste.\nProceed through the other samples in a similar manner, rinsing your mouth between each.\nSelect the taste identified in each case below.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution A',
				variable: 'solution_a',
				HelperText: '',
				options: [
					{
						text: 'Sweet',
						id: uid()
					},
					{
						text: 'Sour',
						id: uid()
					},
					{
						text: 'Salty',
						id: uid()
					},
					{
						text: 'Bitter',
						id: uid()
					}
				],
				compulsory: true
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution B',
				variable: 'solution_b',
				HelperText: '',
				options: [
					{
						text: 'Sweet',
						id: uid()
					},
					{
						text: 'Sour',
						id: uid()
					},
					{
						text: 'Salty',
						id: uid()
					},
					{
						text: 'Bitter',
						id: uid()
					}
				],
				compulsory: true
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution C',
				variable: 'solution_c',
				HelperText: '',
				options: [
					{
						text: 'Sweet',
						id: uid()
					},
					{
						text: 'Sour',
						id: uid()
					},
					{
						text: 'Salty',
						id: uid()
					},
					{
						text: 'Bitter',
						id: uid()
					}
				],
				compulsory: true
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution D',
				variable: 'solution_d',
				HelperText: '',
				options: [
					{
						text: 'Sweet',
						id: uid()
					},
					{
						text: 'Sour',
						id: uid()
					},
					{
						text: 'Salty',
						id: uid()
					},
					{
						text: 'Bitter',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Taste Intensity',
		id: 'taste_intesity',
		t: 'Training',
		s: 'Tester is presented with three or more samples and asked to order them in terms of intensity of a specific characteristic',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>Starting in any order, choose a cup, take a sip from it, hold it in your mouth for at least 10 seconds and note the taste. </p><p>Proceed through the other samples in a similar manner, rinsing your mouth between each. </p><p>Please order the samples in terms of taste intensity i.e. the first for the strongest and the last for the weakest solution.</p>',
					text: 'Starting in any order, choose a cup, take a sip from it, hold it in your mouth for at least 10 seconds and note the taste. \nProceed through the other samples in a similar manner, rinsing your mouth between each. \nPlease order the samples in terms of taste intensity i.e. the first for the strongest and the last for the weakest solution.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Ranking',
				id: uid(),
				label: '',
				variable: 'intensity_ranking',
				HelperText: '',
				options: [
					{
						text: 'Cup 687',
						id: uid()
					},
					{
						text: 'Cup 128',
						id: uid()
					},
					{
						text: 'Cup 912',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	//Difference Tests
	{
		n: 'Simple - Paired Comparison',
		id: 'simple_paired_comparison',
		t: 'Difference',
		s: 'Tester is asked if there is a difference between two samples',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>You are presented with two coded samples. </p><p>Please taste the samples in the order given. </p><p>Can you detect a difference between the samples?</p>',
					text: 'You are presented with two coded samples. \nPlease taste the samples in the order given. \nCan you detect a difference between the samples?\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Single Select',
				id: uid(),
				label: '',
				variable: 'detect_difference',
				HelperText: '',
				options: [
					{
						text: 'Yes',
						id: uid()
					},
					{
						text: 'No',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Directional - Paired Comparison',
		id: 'directional_paired_comparison',
		t: 'Difference',
		s: 'Tester is asked which sample has more distinct attribute(s), e.g. Which sample is sweeter?',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are two coded samples. </p><p>Starting with the sample on the left, taste each sample and select the sample that is sweeter. </p><p>You must make a choice. You may re-taste as often as you wish.</p>',
					text: 'In front of you are two coded samples. \nStarting with the sample on the left, taste each sample and select the sample that is sweeter. \nYou must make a choice. You may re-taste as often as you wish.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Single Select',
				id: uid(),
				label: '',
				variable: 'different_sample',
				HelperText: '',
				options: [
					{
						text: 'Sample 812',
						id: uid()
					},
					{
						text: 'Sample 354',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Duo-Trio',
		id: 'duo_trio',
		t: 'Difference',
		s: 'Tester is presented with three samples (A reference and two other samples); then asked to identify the sample different from the reference',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>You are presented with three samples, one marked R and two other coded samples. </p><p>Starting from the left, taste the R sample followed by the two coded samples in the order given. </p><p>Select the sample that is different from R. You may re-taste the samples. </p>',
					text: 'You are presented with three samples, one marked R and two other coded samples. \nStarting from the left, taste the R sample followed by the two coded samples in the order given. \nSelect the sample that is different from R. You may re-taste the samples. \n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Single Select',
				id: uid(),
				label: '',
				variable: 'different_sample',
				HelperText: '',
				options: [
					{
						text: 'Sample A',
						id: uid()
					},
					{
						text: 'Sample B',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Triangle',
		id: 'triangle',
		t: 'Difference',
		s: 'Tester is presented with three samples (Two are the same & one is different); then asked to identify the different sample',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are three coded samples, two are the same and one is different. </p><p>Starting from the left, taste the samples and enter the code for the one that is different from the other two. </p><p>You may re-taste the samples.</p>',
					text: 'In front of you are three coded samples, two are the same and one is different. \nStarting from the left, taste the samples and enter the code for the one that is different from the other two. \nYou may re-taste the samples.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Number Input',
				id: uid(),
				label: 'Enter the code for the different sample',
				variable: 'selected_sample',
				HelperText: '',
				compulsory: true
			}
		]
	},
	//Preference / Hedonic / Affective
	{
		n: 'Paired Preference',
		id: 'paired_preference',
		t: 'Affective',
		s: 'Tester is presented with two coded samples; then asked to select the one they prefer the most',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are two coded samples.</p><p>Taste each sample and select the sample that you prefer.</p>',
					text: 'In front of you are two coded samples.\nTaste each sample and select the sample that you prefer.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Single Select',
				id: uid(),
				label: '',
				variable: 'prefered_sample',
				HelperText: '',
				options: [
					{
						text: 'Sample A',
						id: uid()
					},
					{
						text: 'Sample B',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Hedonic Rating',
		id: 'hedonic_rating',
		t: 'Affective',
		s: 'Tester is presented with one or more coded samples; then asked to indicate their degree of liking of the sample(s) based on a scale.',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are three coded samples. </p><p>Taste each sample and select how much you like or dislike it.</p>',
					text: 'In front of you are three coded samples. \nTaste each sample and select how much you like or dislike it.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution A',
				variable: 'solution_a',
				HelperText: '',
				options: [
					{
						text: 'Like a lot',
						id: uid()
					},
					{
						text: 'Like a little',
						id: uid()
					},
					{
						text: 'Neither like nor dislike',
						id: uid()
					},
					{
						text: 'Dislike a little',
						id: uid()
					},
					{
						text: 'Dislike a lot',
						id: uid()
					}
				],
				compulsory: true
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution B',
				variable: 'solution_b',
				HelperText: '',
				options: [
					{
						text: 'Like a lot',
						id: uid()
					},
					{
						text: 'Like a little',
						id: uid()
					},
					{
						text: 'Neither like nor dislike',
						id: uid()
					},
					{
						text: 'Dislike a little',
						id: uid()
					},
					{
						text: 'Dislike a lot',
						id: uid()
					}
				],
				compulsory: true
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Solution C',
				variable: 'solution_c',
				HelperText: '',
				options: [
					{
						text: 'Like a lot',
						id: uid()
					},
					{
						text: 'Like a little',
						id: uid()
					},
					{
						text: 'Neither like nor dislike',
						id: uid()
					},
					{
						text: 'Dislike a little',
						id: uid()
					},
					{
						text: 'Dislike a lot',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Food Action Rating',
		id: 'food_action_rating',
		t: 'Affective',
		s: 'Tester is presented with one or more coded samples; then asked to indicate their attititude towards an action on the sample(s) based on a scale.',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>You are presented with a food sample. </p><p>Please taste the sample and select the option that best describes how you feel about it.</p>',
					text: 'You are presented with a food sample. \nPlease taste the sample and select the option that best describes how you feel about it.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Dropdown Select',
				id: uid(),
				label: 'Select your option below',
				variable: 'action_selection',
				HelperText: '',
				options: [
					{
						text: 'I would eat this every opportunity that I had',
						id: uid()
					},
					{
						text: 'I would eat this very often',
						id: uid()
					},
					{
						text: 'I like this and would eat it now and then',
						id: uid()
					},
					{
						text: 'I would eat this if available but would not go out of my  way',
						id: uid()
					},
					{
						text: 'I don’t like this but would eat it on occasion',
						id: uid()
					},
					{
						text: 'I would hardly ever eat this',
						id: uid()
					},
					{
						text: 'I would eat this only if forced to',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Preference Ranking',
		id: 'preference_ranking',
		t: 'Affective',
		s: 'Tester is presented with two or more coded samples; then asked to rank them in order of preference.',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are three coded samples. Taste each sample.&nbsp;</p><p>Please order the samples in terms of preference i.e.<em> the first for your most preferred and the last for your least preferred.</em></p>',
					text: 'In front of you are three coded samples. Taste each sample. \nPlease order the samples in terms of preference i.e. the first for your most preferred and the last for your least preferred.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Ranking',
				id: uid(),
				label: '',
				variable: 'preference_ranking',
				HelperText: '',
				options: [
					{
						text: 'Cup 213',
						id: uid()
					},
					{
						text: 'Cup 628',
						id: uid()
					},
					{
						text: 'Cup 412',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	//Descriptive
	{
		n: 'Descriptive Ranking',
		id: 'descriptive_ranking',
		t: 'Descriptive',
		s: 'Tester is presented with two or more coded samples; then asked to rank them in order of intensity of a specific attribute(s).',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>In front of you are three coded samples.</p><p>Taste each sample. </p><p>Please rank the samples in order of creaminess by placing the<em> first for the creamiest and the last for the weakest least creamy.</em></p>',
					text: 'In front of you are three coded samples.\nTaste each sample. \nPlease rank the samples in order of creaminess by placing the first for the creamiest and the last for the weakest least creamy.\n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Ranking',
				id: uid(),
				label: '',
				variable: 'creaminess_ranking',
				HelperText: '',
				options: [
					{
						text: '687',
						id: uid()
					},
					{
						text: '128',
						id: uid()
					},
					{
						text: '912',
						id: uid()
					}
				],
				compulsory: true
			}
		]
	},
	{
		n: 'Descriptive Rating',
		id: 'descriptive_rating',
		t: 'Descriptive',
		s: 'Tester is presented with one sample; then asked to rate the intensity of a specific preselected attribute(s).',
		test: [
			{
				name: 'Text Input',
				id: uid(),
				label: 'What is your name?',
				variable: 'name',
				HelperText: '',
				compulsory: true
			},
			{
				name: 'Text Block',
				id: uid(),
				text: {
					html: '<p>You are presented with a sample of Tomato Sauce.</p><p>Please evaluate and rate the sample for each attribute and select the number that best describes your choice on the line scale below.</p><p><br></p><p><em>1 = very weak, 2 = weak, 3 = neither weak nor strong, 4 = strong, 5 = very strong&nbsp;</em></p>',
					text: 'You are presented with a sample of Tomato Sauce.\nPlease evaluate and rate the sample for each attribute and select the number that best describes your choice on the line scale below.\n\n1 = very weak, 2 = weak, 3 = neither weak nor strong, 4 = strong, 5 = very strong \n'
				},
				compulsory: false
			},
			{
				name: 'Horizontal Line',
				id: uid(),
				compulsory: false
			},
			{
				name: 'Range Select',
				id: uid(),
				label: 'Aroma',
				variable: 'aroma',
				HelperText: '',
				compulsory: true,
				min: 1,
				max: 5
			},
			{
				name: 'Range Select',
				id: uid(),
				label: 'Flavour',
				variable: 'flavour',
				HelperText: '',
				compulsory: true,
				min: 1,
				max: 5
			},
			{
				name: 'Range Select',
				id: uid(),
				label: 'Color',
				variable: 'color',
				HelperText: '',
				compulsory: true,
				min: 1,
				max: 5
			}
		]
	}
]);
export const filtered = derived([term, items], ([$term, $items]) =>
	$items.filter((x) => x.t.includes($term))
);
