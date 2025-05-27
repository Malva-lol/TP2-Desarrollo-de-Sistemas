import { db } from "../db/db";
	
export class userService {
	async getUsers() {
		return await db.user.findMany();
	}

	async getUserById(userID: string) {
		return await db.user.findFirst({
			where: {
				id: userID,
			},
		});
	}

	async getUserByEmail(email: string) {
		const user = await db.user.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new Error("No hay usuario con el email/nombre dado :3");
		}
		return user;
	}

	async createUser(email: string, name: string, password: string) {
		try {
			const user = await db.user.create({
				data: { email, name, password: password },
			});
			return user;
		} catch (error) {
			throw new Error("Error al crear el usuario :c");
		}
	}
}
