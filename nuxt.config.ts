import apiUrls from './constants/api-urls'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiUrls,
    },
  },
})