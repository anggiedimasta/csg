<script setup lang="ts">
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot
} from '@headlessui/vue'
import VueFeather from 'vue-feather'

definePageMeta({
	description: 'Posts page with table',
	title: 'Posts',
	url: 'post'
})

const isCommentsModalOpen = ref(false)
const isLoading = ref(false)
const postStore = usePostStore()

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

function setIsCommentsModalOpen(value: boolean, id?: number): void {
	isCommentsModalOpen.value = value

	if (id) {
		isLoading.value = true
		postStore
			.getComments(id)
			.then(() => {
				isLoading.value = false
			})
			.catch(() => {
				isLoading.value = false
			})
	}
	else {
		postStore.postComments = []
	}
}

getPosts()
</script>

<template>
	<div>
		<TransitionRoot
			as="template"
			:show="isCommentsModalOpen"
		>
			<Dialog
				class="relative z-50"
				@close="setIsCommentsModalOpen(false)"
			>
				<TransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in duration-200"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
				</TransitionChild>

				<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild
							as="template"
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
								<ul
									role="list"
									class="space-y-6"
								>
									<li
										v-for="(comment, commentIndex) in postStore.postComments"
										:key="comment.id"
										class="relative flex gap-x-4"
									>
										<div :class="[commentIndex === postStore.postComments.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-2 top-0 flex w-6 justify-center']">
											<div class="w-px bg-gray-200" />
										</div>
										<div class="relative flex size-10 flex-none items-center justify-center bg-gray-100 rounded-full overflow-hidden p-2">
											<VueFeather
												size="1.25rem"
												aria-hidden="true"
												type="user"
											/>
										</div>
										<div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
											<div class="flex justify-between gap-x-4">
												<div class="py-0.5 text-xs/5 text-gray-500">
													<span class="font-medium text-gray-900">{{ comment.name }}</span> commented
												</div>
												<div
													class="flex py-0.5 text-xs/5 text-gray-500 items-center"
												>
													<VueFeather
														size="0.75rem"
														aria-hidden="true"
														type="mail"
														class="mr-1"
													/>
													{{ comment.email }}
												</div>
											</div>
											<p class="text-sm/6 text-gray-500">
												{{ comment.body }}
											</p>
										</div>
									</li>
								</ul>
								<div class="mt-5 sm:mt-6 justify-end flex">
									<CsgButton
										text="Back to posts"
										variant="csg"
										@click="setIsCommentsModalOpen(false)"
									/>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
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
					<span
						v-for="(part, index) in highlightMatchedWord(row.body)"
						:key="index"
					>
						<span
							v-if="part.toLowerCase() === postStore.posts.params.search?.toLowerCase()"
							class="bg-yellow-100"
						>{{ part }}</span>
						<span v-else>{{ part }}</span>
					</span>
				</span>
			</template>
			<template #body-column-view-comments="{ row }: { row: any }">
				<div class="flex items-center justify-center">
					<CsgButton
						text-size="xs"
						icon="eye"
						size="xxs"
						padding="xs"
						variant="csg"
						text="View Comments"
						@click="setIsCommentsModalOpen(true, row.id)"
					/>
				</div>
			</template>
		</CsgTable>
	</div>
</template>
