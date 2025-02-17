export const badgeColorPairs = {
	gray: {
		bgColorClass: 'bg-gray-100',
		textColorClass: 'text-gray-400'
	},
	csg: {
		bgColorClass: 'bg-csg-tertiary',
		textColorClass: 'text-black'
	}
}
export const badgeVariants = Object.keys(badgeColorPairs)

export const buttonColorPairs = {
	csg: {
		bgColorClass: 'bg-csg-tertiary',
		textColorClass: 'text-white'
	},
	gray: {
		bgColorClass: 'bg-gray-100',
		textColorClass: 'text-black'
	},
	'red-light': {
		bgColorClass: 'bg-red-200',
		textColorClass: 'text-red-700'
	},
	transparent: {
		bgColorClass: 'bg-transparent',
		textColorClass: 'text-gray-800'
	},
	'transparent-with-border': {
		bgColorClass: 'bg-transparent',
		borderColorClass: 'border border-gray-200',
		textColorClass: 'text-gray-800'
	}
}
export const buttonVariants = Object.keys(buttonColorPairs)

export const dropdownColorPairs = {
	'green-light': {
		bgColorClass: 'bg-black hover:bg-green-500',
		textColorClass: 'text-green-700'
	},
	'red-light': {
		bgColorClass: 'bg-black hover:bg-red-500',
		textColorClass: 'text-red-700'
	},
	white: {
		bgColorClass: 'bg-black hover:bg-gray-100',
		textColorClass: 'text-black'
	}
}
export const dropdownVariants = Object.keys(dropdownColorPairs)
