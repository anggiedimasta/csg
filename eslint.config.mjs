// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'@stylistic/arrow-parens': [2, 'always'],
		'@stylistic/comma-dangle': [2, 'always-multiline'],
		'@stylistic/indent': [2, 'tab', { SwitchCase: 1 }],
		'@stylistic/no-mixed-spaces-and-tabs': 2,
		'@stylistic/quotes': [2, 'single', { avoidEscape: true }],
		'@stylistic/semi': [2, 'never'],
		'@stylistic/space-before-function-paren': [2, 'never'],
	},
})
