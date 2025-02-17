<script setup lang="ts">
definePageMeta({
	description: 'Posts page with table',
	title: 'Posts',
	url: 'post'
})

const postStore = usePostStore()
const isLoading = ref(false)

function getPosts() {
	isLoading.value = true
	postStore
		.getPosts()
		.then(() => {
			isLoading.value = false
		})
		.catch(() => {
			isLoading.value = false
		})
}

function highlightMatchedWord(text: string): string[] {
	if (!postStore.posts.params.search) return [text]
	const regex = new RegExp(`(${postStore.posts.params.search})`, 'gi')
	return text.split(regex)
}

getPosts()
</script>

<template>
	<div>
		<CsgTable
			:columns="postStore.posts.columns"
			:is-fetching="isLoading"
			:is-numbered="false"
			:is-showing-info="true"
			:params="postStore.posts.params"
			:rows="postStore.posts.rows"
			:total-page="postStore.posts.totalPage"
			:total-rows="postStore.posts.totalRows"
			search-placeholder="Search by body..."
			type="client"
			>
			<template #body-column-body="{ row }: { row: any }">
				<span>
					<span v-for="(part, index) in highlightMatchedWord(row.body)" :key="index">
						<span v-if="part.toLowerCase() === postStore.posts.params.search?.toLowerCase()" class="bg-yellow-100">{{ part }}</span>
						<span v-else>{{ part }}</span>
					</span>
				</span>
			</template>
	</CsgTable>
	</div>
</template>
