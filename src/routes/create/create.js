import { uid } from '$lib/JS/custom.js';

export let items = [
	{
		name: 'Text Block',
		id: uid(),
		text: { text: 'This is a Text Block', html: '<p>This is a Text Block</p>' },
		compulsory: false
	},
	{
		name: 'Line Break',
		id: uid(),
		compulsory: false
	},
	{
		name: 'Horizontal Line',
		id: uid(),
		compulsory: false
	},
	{
		name: 'Text Input',
		id: uid(),
		label: 'This is a Label',
		variable: 'text_variable',
		HelperText: 'This is a Helper Text',
		compulsory: true
	},
	{
		name: 'Number Input',
		id: uid(),
		label: 'This is a Label',
		variable: 'number_variable',
		HelperText: 'This is a Helper Text',
		compulsory: true
	},
	{
		name: 'Textarea Input',
		id: uid(),
		label: 'This is a Label',
		variable: 'textarea_variable',
		HelperText: 'This is a Helper Text',
		compulsory: true
	},
	{
		name: 'Dropdown Select',
		id: uid(),
		label: 'This is a Label',
		variable: 'dropdown_variable',
		HelperText: 'This is a Helper Text',
		options: [
			{ text: 'Option 1', id: uid() },
			{ text: 'Option 2', id: uid() },
			{ text: 'Option 3', id: uid() }
		],
		compulsory: true
	},
	{
		name: 'Single Select',
		id: uid(),
		label: 'This is a Label',
		variable: 'dropdown_variable',
		HelperText: 'This is a Helper Text',
		options: [
			{ text: 'Option 1', id: uid() },
			{ text: 'Option 2', id: uid() },
			{ text: 'Option 3', id: uid() }
		],
		compulsory: true
	},
	{
		name: 'Multiple Select',
		id: uid(),
		label: 'This is a Label',
		variable: 'dropdown_variable',
		HelperText: 'This is a Helper Text',
		options: [
			{ text: 'Option 1', id: uid() },
			{ text: 'Option 2', id: uid() },
			{ text: 'Option 3', id: uid() }
		],
		compulsory: true
	},
	{
		name: 'Ranking',
		id: uid(),
		label: 'This is a Label',
		variable: 'dropdown_variable',
		HelperText: 'This is a Helper Text',
		options: [
			{ text: 'Option 1', id: uid() },
			{ text: 'Option 2', id: uid() },
			{ text: 'Option 3', id: uid() }
		],
		compulsory: true
	},
	{
		name: 'Range Select',
		id: uid(),
		label: 'This is a Label',
		variable: 'dropdown_variable',
		HelperText: 'This is a Helper Text',
		compulsory: true,
		min: 0,
		max: 100
	},
	{
		name: 'Image',
		id: uid(),
		dataURL: '',
		compulsory: false
	}
];
