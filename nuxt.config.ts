import apiUrls from './constants/api-urls'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/tailwindcss'],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'description', content: 'CSG' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			]
		}
	},
	runtimeConfig: {
		// Keys within public are also exposed client-side
		public: {
			apiUrls,
			appName: 'CSG'
		}
	},
	compatibilityDate: '2024-11-01',
	eslint: {
		config: {
			stylistic: {
				arrowParens: true,
				commaDangle: 'never',
				indent: 'tab',
				semi: false
			}
		}
	}
})
