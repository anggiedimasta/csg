export const usePostStore = defineStore('postStore', {
	state: (): PostState => ({
		posts: {
			columns: [
				{
					headerAlign: 'center',
					valueAlign: 'center',
					key: 'id',
					label: 'ID',
					width: '50px',
					isSortable: false
				},
				{
					headerAlign: 'left',
					key: 'title',
					label: 'Title',
					valueAlign: 'left',
					width: '200px',
					isSortable: false
				},
				{
					headerAlign: 'left',
					key: 'body',
					label: 'Body',
					valueAlign: 'left',
					width: '250px',
					isBodyHtml: true,
					isSortable: false
				},
				{
					headerAlign: 'center',
					key: 'userId',
					label: 'User ID',
					valueAlign: 'center',
					width: '100px',
					isSortable: false
				}
			],
			params: {
				currentPage: 1,
				perPage: 10,
				search: 'rerum',
				searchBy: ['body'],
				sortBy: null,
				sortType: null
			},
			rows: [],
			totalPage: 0,
			totalRows: 0
		}
	}),
	actions: {
		async getPosts() {
			const data = await $fetch(useRuntimeConfig().public.apiUrls.post.list, {
				method: 'GET'
			}).catch((error: unknown) => error) as Post[]

			this.posts.rows = data
			this.posts.totalRows = data.length
			this.posts.totalPage = Math.ceil(data.length / this.posts.params.perPage)
		}
	}
})
