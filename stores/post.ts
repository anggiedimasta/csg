export const usePostStore = defineStore('postStore', {
	state: (): PostState => ({
		postComments: [],
		posts: {
			columns: [
				{
					headerAlign: 'center',
					isSortable: false,
					key: 'id',
					label: 'ID',
					valueAlign: 'center',
					width: '50px'
				},
				{
					headerAlign: 'left',
					isSortable: false,
					key: 'title',
					label: 'Title',
					valueAlign: 'left',
					width: '200px'
				},
				{
					headerAlign: 'left',
					isBodyHtml: true,
					isSortable: false,
					key: 'body',
					label: 'Body',
					valueAlign: 'left',
					width: '250px'
				},
				{
					headerAlign: 'center',
					isSortable: false,
					key: 'userId',
					label: 'User ID',
					valueAlign: 'center',
					width: '100px'
				},
				{
					headerAlign: 'center',
					isBodyHtml: true,
					isSortable: false,
					key: 'view-comments',
					label: 'Action',
					valueAlign: 'center',
					width: '100px'
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
		async getComments(id: number) {
			const data = await $fetch(useApiUrls().post.commentList(id), {
				method: 'GET'
			}).catch((error: unknown) => error) as Comment[]

			this.postComments = data
		},
		async getPosts() {
			const data = await $fetch(useApiUrls().post.list, {
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
