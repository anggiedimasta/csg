export const usePostStore = defineStore('postStore', {
  state: (): PostState => ({
    posts: [],
  }),
  actions: {
    async getPosts() {
      const data = await $fetch(useRuntimeConfig().public.apiUrls.post.list, {
        method: 'GET',
      }).catch((error: unknown) => error) as Post[]

      this.posts = data
    },
  },
})
