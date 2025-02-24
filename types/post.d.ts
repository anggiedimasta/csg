declare global {
	interface Post {
		body: string
		id: number
		title: string
		userId: number
	}

	interface Comment {
		body: string
		email: string
		id: number
		name: string
		postId: number
	}

	interface TotalPostByUserRaw {
		[userId: number]: number
	}

	interface TotalPostByUser {
		userId: number
		totalPost: number
	}

	interface PostState {
		postComments: Comment[]
		posts: {
			columns: TableColumn[]
			params: TableParams
			rows: Post[]
			totalPage: number
			totalRows: number
		}
		totalPostByKeyword: {
			searchText: string
			totalRows: number
		}
		totalPostByUser: {
			columns: TableColumn[]
			params: TableParams
			rows: TotalPostByUser[]
			totalPage: number
			totalRows: number
		}
	}
}

export {}
