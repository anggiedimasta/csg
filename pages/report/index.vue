<script setup lang="ts">
definePageMeta({
	description: 'Reports page with table of total post by user',
	title: 'Reports',
	url: 'report'
})

const postStore = usePostStore()
const isLoading = ref(false)

async function getPosts() {
	isLoading.value = true
	await postStore
		.getPosts()
		.then(() => {
			isLoading.value = false
		})
		.catch(() => {
			isLoading.value = false
		})
}

function getTotalPostByUser() {
	isLoading.value = true
	getPosts().then(() => {
		isLoading.value = false
		postStore.getTotalPostByUser()
	}).catch(() => {
		isLoading.value = false
	})
}

getTotalPostByUser()
</script>

<template>
	<div>
		<CsgTable
			:columns="postStore.totalPostByUser.columns"
			:is-fetching="isLoading"
			:is-numbered="false"
			:is-showing-header="false"
			:is-showing-info="true"
			:is-using-search="false"
			:params="postStore.totalPostByUser.params"
			:rows="postStore.totalPostByUser.rows"
			:total-page="postStore.totalPostByUser.totalPage"
			:total-rows="postStore.totalPostByUser.totalRows"
			type="client"
		/>
	</div>
</template>
