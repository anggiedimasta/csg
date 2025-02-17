declare global {
	interface Post {
		body: string
		id: number
		title: string
		userId: number
	}

	interface PostState {
		posts: Post[]
	}
}

export {}
