declare global {
	interface Post {
		body: string
		id: number
		title: string
		userId: number
	}

	interface TotalPostByUserRaw {
		[userId: number]: number
	}

	interface TotalPostByUser {
		userId: number
		totalPost: number
	}

	interface PostState {
		posts: {
			columns: TableColumn[]
			params: TableParams
			rows: Post[]
			totalPage: number
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
