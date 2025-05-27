import type { Pedido } from "@prisma/client";
import { db } from "../db/db";

export class postService {
	async createPost(post: Pedido) {
		return await db.post.findMany({
			include: {
				user: {
					select: {
						name: true,
						id: true,
					},
				},
				_count: {
					select: {
						comments: true,
					},
				},
			},
		});
	}

	async getPostsByUser(userID: string) {
		return await db.post.findMany({
			where: {
				id_user: userID,
			},
		});
	}

	async getPostById(postID: string) {
		return await db.post.findFirst({
			include: {
				user: {
					select: {
						name: true,
						id: true,
					},
				},
				comments: {
					include: {
						user: {
							select: {
								name: true,
								id: true,
							},
						},
					},
				},
			},
			where: {
				id: postID,
			},
		});
	}

	async createComment(post: Pedido) {
		return await db.post.create({
			data: post,
		});
	}
}
