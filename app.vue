<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const appName = config.public.appName

watch(
	() => route.meta.title,
	() => {
		useHead({
			link: [
				{
					rel: 'icon',
					href: '/images/csg-logo-black.svg'
				}
			],
			meta: [
				{
					property: 'lang',
					content: 'en'
				},
				{
					property: 'description',
					content: route.meta.description ? `${route.meta.description} · ${appName}` : appName
				},
				{
					property: 'og:title',
					content: route.meta.title ? `${route.meta.title} · ${appName}` : appName
				},
				{
					property: 'og:description',
					content: route.meta.description ? `${route.meta.description} · ${appName}` : appName
				},
				{
					property: 'og:url',
					content: `${config.public.baseUrl}${route.meta.url}`
				},
				{
					property: 'twitter:title',
					content: route.meta.title ? `${route.meta.title} · ${appName}` : appName
				},
				{
					property: 'twitter:card',
					content: 'summary'
				},
				{
					property: 'twitter:description',
					content: route.meta.description ? `${route.meta.description} · ${appName}` : appName
				}
			],
			titleTemplate: () => {
				return route.meta.title ? `${route.meta.title} · ${appName}` : appName
			}
		})
	},
	{ immediate: true }
)
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
