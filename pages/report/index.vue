<script setup lang="ts">
import VueFeather from 'vue-feather'

definePageMeta({
	description: 'Reports page with table of total post by user',
	title: 'Reports',
	url: 'report'
})

const isLoading = ref(false)
const localSearchByKeywordText = ref('rerum')
const postStore = usePostStore()

function getTotalPostByKeyword() {
	postStore.getTotalPostByKeyword(localSearchByKeywordText.value)
}

async function getPostsWithDetails() {
	isLoading.value = true
	await postStore
		.getPosts()
		.then(() => {
			isLoading.value = false
			postStore.getTotalPostByUser()
			getTotalPostByKeyword()
		})
		.catch(() => {
			isLoading.value = false
			postStore.getTotalPostByUser()
			getTotalPostByKeyword()
		})
}

getPostsWithDetails()

watch(
	() => postStore.totalPostByKeyword.searchText,
	(searchText) => {
		localSearchByKeywordText.value = searchText
	}
)

const isTotalPostByKeywordChanged = computed(() => {
	if (postStore.totalPostByKeyword.searchText !== '') return true
	return false
})
</script>

<template>
	<div>
		<ul
			role="list"
			class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
		>
			<li
				class="overflow-hidden rounded-xl border border-gray-200"
			>
				<div class="flex items-center border-b border-gray-900/5 bg-csg-tertiary p-4 text-lg font-medium text-white gap-x-2">
					<VueFeather
						size="1.25rem"
						type="search"
					/>
					<span>Total post by keyword</span>
				</div>
				<dl class="divide-y divide-gray-100 px-6 py-4 text-sm/6 bg-white">
					<div class="flex items-center justify-between gap-x-2 py-3">
						<span class="text-gray-700 flex flex-1">Keyword</span>
						<div class="flex items-center flex-shrink-0 gap-x-2">
							<CsgInput
								v-model="localSearchByKeywordText"
								:is-loading="isLoading"
								is-update-on-enter
								size="lg"
								@update:model-value="getTotalPostByKeyword"
							/>
							<CsgButton
								v-if="isTotalPostByKeywordChanged"
								:is-loading="isLoading"
								icon="refresh-ccw"
								size="xxs"
								variant="red-light"
								@click="postStore.resetTotalPostByKeyword"
							/>
						</div>
					</div>
					<div class="flex justify-between gap-x-4 py-3">
						<dt class="text-gray-700">
							Total Post
						</dt>
						<dd class="flex items-start gap-x-2">
							<div class="font-medium text-gray-900">
								{{ postStore.totalPostByKeyword.totalRows }}
							</div>
						</dd>
					</div>
				</dl>
			</li>
		</ul>
		<div class="flex w-full mt-8 pt-4 mb-4 border-t border-gray-200">
			<h2 class="text-2xl font-semibold text-gray-700">
				Total post by user
			</h2>
		</div>
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
