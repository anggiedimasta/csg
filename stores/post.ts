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
		},
		totalPostByKeyword: {
			searchText: 'rerum',
			totalRows: 0
		},
		totalPostByUser: {
			columns: [
				{
					headerAlign: 'center',
					valueAlign: 'center',
					key: 'userId',
					label: 'User ID',
					width: '100px',
					isSortable: false
				},
				{
					headerAlign: 'center',
					key: 'totalPost',
					label: 'Total Post',
					valueAlign: 'center',
					width: '100px',
					isSortable: false
				}
			],
			params: {
				currentPage: 1,
				perPage: 10,
				search: null,
				searchBy: [],
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
		},
		getTotalPostByKeyword(searchText: string) {
			if (!searchText) {
				this.resetTotalPostByKeyword()
			}
			else {
				this.totalPostByKeyword.searchText = searchText
				this.totalPostByKeyword.totalRows = this.posts.rows.filter((post) => post.body.toLowerCase().includes(this.totalPostByKeyword.searchText.toLowerCase())).length
			}
		},
		getTotalPostByUser() {
			const totalPostByUser: TotalPostByUserRaw = this.posts.rows.reduce((total, post) => {
				if (!total[post.userId]) {
					total[post.userId] = 0
				}
				total[post.userId]++
				return total
			}, {} as TotalPostByUserRaw)

			this.totalPostByUser.rows = Object.entries(totalPostByUser).map(([userId, totalPost]) => ({
				userId: Number(userId),
				totalPost
			}))
			this.totalPostByUser.totalRows = this.totalPostByUser.rows.length
			this.totalPostByUser.totalPage = Math.ceil(this.totalPostByUser.rows.length / this.totalPostByUser.params.perPage)
		},
		resetTotalPostByKeyword() {
			this.totalPostByKeyword.searchText = ''
			this.totalPostByKeyword.totalRows = 0
		}
	}
})
