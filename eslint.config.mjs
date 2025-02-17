// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'arrow-parens': [2, 'always'],
		'comma-dangle': [2, 'never'],
		'indent': [2, 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': 2,
		'quotes': [2, 'single', { avoidEscape: true }],
		'semi': [2, 'never']
	}
})
