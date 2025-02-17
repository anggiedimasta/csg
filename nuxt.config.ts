import apiUrls from './constants/api-urls'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt', '@nuxt/eslint'],
	devtools: { enabled: true },
	runtimeConfig: {
		// Keys within public are also exposed client-side
		public: {
			apiUrls,
		},
	},
	compatibilityDate: '2024-11-01',
})
