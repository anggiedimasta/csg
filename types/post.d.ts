declare global {
	interface Post {
		body: string
		id: number
		title: string
		userId: number
	}

	interface PostState {
		posts: {
			columns: TableColumn[]
			params: TableParams
			rows: Post[]
			totalPage: number
			totalRows: number
		}
	}
}

export {}
