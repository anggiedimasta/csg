<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import VueFeather from 'vue-feather'

const route = useRoute()
const sidebarOpen = ref(false)

function isCurrentRouteActive(current: string) {
	return current === route.path
}

const navigation = computed(() => {
	return [
		{ name: 'Posts', href: '/post', icon: 'message-circle', isActive: isCurrentRouteActive('/post') },
		{ name: 'Reports', href: '/report', icon: 'pie-chart', isActive: isCurrentRouteActive('/report') }
	]
})
</script>

<template>
	<div>
		<TransitionRoot
			as="template"
			:show="sidebarOpen"
		>
			<Dialog
				class="relative z-50 lg:hidden"
				@close="sidebarOpen = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-csg-tertiary/20" />
				</TransitionChild>

				<div class="fixed inset-0 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
									<button
										aria-label="Close sidebar"
										class="-m-2.5 p-2.5"
										type="button"
										@click="sidebarOpen = false"
									>
										<span class="sr-only">Close sidebar</span>
										<VueFeather
											type="x"
											aria-hidden="true"
											size="1.25rem"
										/>
									</button>
								</div>
							</TransitionChild>
							<!-- Sidebar component, swap this element with another sidebar if you like -->
							<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10">
								<div class="flex h-24 shrink-0 items-center">
									<img
										class="h-8 w-auto"
										src="/images/csg-logo-black.svg"
										alt="CSG logo"
									>
								</div>
								<nav class="flex flex-1 flex-col">
									<ul
										role="list"
										class="flex flex-1 flex-col gap-y-7"
									>
										<li>
											<ul
												role="list"
												class="-mx-2 space-y-1"
											>
												<li
													v-for="item in navigation"
													:key="item.name"
												>
													<a
														:class="[item.isActive ? 'bg-csg-tertiary text-white' : 'text-gray-700 hover:bg-csg-tertiary hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']"
														:href="item.href"
														class="items-center"
													>
														<VueFeather
															:type="item.icon"
															aria-hidden="true"
															size="1.25rem"
														/>
														{{ item.name }}
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- Static sidebar for desktop -->
		<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 shadow-lg">
				<div class="flex h-24 shrink-0 items-center">
					<img
						class="h-8 w-auto"
						src="/images/csg-logo-black.svg"
						alt="CSG logo"
					>
				</div>
				<nav class="flex flex-1 flex-col">
					<ul
						role="list"
						class="flex flex-1 flex-col gap-y-7"
					>
						<li>
							<ul
								role="list"
								class="-mx-2 space-y-1"
							>
								<li
									v-for="item in navigation"
									:key="item.name"
								>
									<a
										:class="[item.isActive ? 'bg-csg-tertiary text-white' : 'text-gray-700 hover:bg-csg-tertiary hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']"
										:href="item.href"
										class="items-center"
									>
										<VueFeather
											:type="item.icon"
											aria-hidden="true"
											size="1.25rem"
										/>
										{{ item.name }}
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
			<button
				aria-label="Open sidebar"
				class="-m-2.5 p-2.5 text-gray-700 lg:hidden items-center flex flex-col"
				type="button"
				@click="sidebarOpen = true"
			>
				<span class="sr-only">Open sidebar</span>
				<VueFeather
					type="menu"
					aria-hidden="true"
					size="1.25rem"
				/>
			</button>
			<div class="flex-1 text-lg font-semibold text-gray-700">
				{{ route.meta.title }}
			</div>
		</div>

		<div class="lg:pl-72">
			<div class="p-4 sm:p-6 lg:p-8 bg-white shadow-md hidden lg:block">
				<h1 class="text-2xl/6 font-semibold text-gray-700">
					{{ route.meta.title }}
				</h1>
			</div>
			<main class="p-4 sm:p-6 lg:p-8">
				<NuxtPage />
			</main>
		</div>
	</div>
</template>

<style lang="sass">
	html
		@apply h-full bg-gray-100

	body
		@apply	h-full
</style>
